// Vercel Serverless Function for Notion Portfolio API
import { Client } from '@notionhq/client';

export default async function handler(req, res) {
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
    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY || process.env.VITE_NOTION_API_KEY,
    });

    const databaseId = process.env.NOTION_DATABASE_ID || process.env.VITE_NOTION_DATABASE_ID;

    if (!databaseId) {
      throw new Error('Notion database ID is not configured');
    }

    console.log('Fetching from Notion database:', databaseId);

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

    console.log('Notion API response:', response.results.length, 'projects found');

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

    console.log('Transformed projects:', projects);

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching portfolio projects from Notion:', error);
    res.status(500).json({ 
      error: 'Failed to fetch portfolio projects',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

