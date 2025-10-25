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
 * Fetch portfolio projects from server API endpoint
 * The API endpoint handles Notion API calls server-side
 */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await fetch('/api/portfolio');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching portfolio projects from Notion:', error);
    throw error;
  }
}
