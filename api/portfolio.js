import { Client } from '@notionhq/client';

// Initialize Notion client with API key from environment variables
const notion = new Client({
  auth: process.env.VITE_NOTION_API_KEY,
});

const databaseId = process.env.VITE_NOTION_DATABASE_ID;

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
    if (!databaseId) {
      throw new Error('VITE_NOTION_DATABASE_ID is not configured');
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Featured',
        checkbox: {
          equals: true,
        },
      },
    });

    const projects = response.results.map((page) => {
      const properties = page.properties;

      // Extract title
      const title = properties['Project Name']?.title?.[0]?.plain_text || 'Untitled Project';

      // Extract description
      const description = properties.Description?.rich_text?.[0]?.plain_text || '';

      // Extract tags (multi-select)
      const tags = properties.Category?.multi_select?.map((tag) => tag.name) || [];

      // Extract image URL
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

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching portfolio projects from Notion:', error);
    res.status(500).json({ 
      error: 'Failed to fetch portfolio projects',
      message: error.message 
    });
  }
}

