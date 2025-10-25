import { Client } from '@notionhq/client';

// Initialize Notion client with API key from environment variables
const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  featured: boolean;
}

/**
 * Fetch portfolio projects from Notion database
 * Only returns projects where Featured checkbox is enabled
 */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
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

    return response.results.map((page: any) => {
      const properties = page.properties;

      // Extract title
      const title = properties['Project Name']?.title?.[0]?.plain_text || 'Untitled Project';

      // Extract description
      const description = properties.Description?.rich_text?.[0]?.plain_text || '';

      // Extract tags (multi-select)
      const tags = properties.Category?.multi_select?.map((tag: any) => tag.name) || [];

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
  } catch (error) {
    console.error('Error fetching portfolio projects from Notion:', error);
    throw error;
  }
}

