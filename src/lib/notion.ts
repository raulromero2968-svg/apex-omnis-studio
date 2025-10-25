import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  category: string;
  techStack: string[];
  summary: string;
  liveDemoUrl?: string;
  documentationUrl?: string;
  featured: boolean;
  screenshots: string[];
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const response: any = await (notion.databases as any).query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Featured',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Start Date',
          direction: 'descending',
        },
      ],
    });

    const projects: PortfolioProject[] = response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: page.id,
        name: properties['Project Name']?.title?.[0]?.plain_text || 'Untitled',
        description: properties['Description']?.rich_text?.[0]?.plain_text || '',
        category: properties['Category']?.select?.name || 'Uncategorized',
        techStack: properties['Tech Stack']?.multi_select?.map((tag: any) => tag.name) || [],
        summary: properties['Summary']?.rich_text?.[0]?.plain_text || '',
        liveDemoUrl: properties['Live Demo URL']?.url || undefined,
        documentationUrl: properties['Documentation Link URL']?.url || undefined,
        featured: properties['Featured']?.checkbox || false,
        screenshots: properties['Screenshots']?.files?.map((file: any) => file.file?.url || file.external?.url).filter(Boolean) || [],
      };
    });

    return projects;
  } catch (error) {
    console.error('Error fetching portfolio projects from Notion:', error);
    return [];
  }
}
