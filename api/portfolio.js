// Vercel Serverless Function for Notion Portfolio API
// Using CommonJS syntax for better Vercel compatibility

const { Client } = require('@notionhq/client');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('Initializing Notion client...');
    console.log('Environment check - NOTION_API_KEY exists:', !!process.env.NOTION_API_KEY);
    console.log('Environment check - NOTION_DATABASE_ID exists:', !!process.env.NOTION_DATABASE_ID);

    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID environment variable is not set');
    }

    if (!process.env.NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY environment variable is not set');
    }

    console.log('Querying Notion database:', databaseId.substring(0, 8) + '...');

    // Query Notion database
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Featured',
        checkbox: {
          equals: true,
        },
      },
    });

    console.log('Notion API response received:', response.results.length, 'projects found');

    // Transform Notion data to portfolio projects
    const projects = response.results.map((page) => {
      const properties = page.properties;

      // Extract title (using "Project Name" as per your database)
      const title = properties['Project Name']?.title?.[0]?.plain_text || 'Untitled Project';

      // Extract description
      const description = properties.Description?.rich_text?.[0]?.plain_text || '';

      // Extract category (using "Category" instead of "Tags")
      const tags = properties.Category?.multi_select?.map((tag) => tag.name) || [];

      // Extract image URL (if exists)
      const imageUrl = properties['Image URL']?.url || '';

      // Extract project URL
      const projectUrl = properties['Project URL']?.url || '';

      // Extract featured status
      const featured = properties.Featured?.checkbox || false;

      return {
        id: page.id,
        title,
        description,
        tags,
        imageUrl,
        projectUrl,
        featured,
      };
    });

    console.log('Successfully transformed', projects.length, 'projects');

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching portfolio projects from Notion:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    res.status(500).json({ 
      error: 'Failed to fetch portfolio projects',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : 'Check server logs for details'
    });
  }
};
