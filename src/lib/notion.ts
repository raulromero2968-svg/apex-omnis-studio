import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.VITE_NOTION_API_KEY,
})

const databaseId = process.env.VITE_NOTION_DATABASE_ID || ''

export interface PortfolioProject {
  id: string
  title: string
  description: string
  category?: string
  tags?: string[]
  techStack?: string[]
  imageUrl?: string
  detailImages?: string[]
  projectUrl?: string
  liveDemo?: string
  documentation?: string
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Featured',
        checkbox: {
          equals: true,
        },
      },
    })

    return response.results.map((page: any) => {
      const properties = page.properties

      // Get title
      const title = properties.Name?.title?.[0]?.plain_text || 'Untitled Project'

      // Get description
      const description = properties.Description?.rich_text?.[0]?.plain_text || ''

      // Get category
      const category = properties.Category?.select?.name || ''

      // Get tags
      const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || []

      // Get tech stack
      const techStack = properties['Tech Stack']?.multi_select?.map((tech: any) => tech.name) || []

      // Get screenshots/images
      const screenshots = properties.Screenshots?.files || []
      
      // First image is the thumbnail (imageUrl)
      const imageUrl = screenshots[0]?.file?.url || screenshots[0]?.external?.url || ''
      
      // All images are detail images
      const detailImages = screenshots
        .map((img: any) => img.file?.url || img.external?.url || '')
        .filter(Boolean)

      // Get links
      const projectUrl = properties['Project URL']?.url || ''
      const liveDemo = properties['Live Demo']?.url || ''
      const documentation = properties.Documentation?.url || ''

      return {
        id: page.id,
        title,
        description,
        category,
        tags,
        techStack,
        imageUrl,
        detailImages,
        projectUrl,
        liveDemo,
        documentation,
      }
    })
  } catch (error) {
    console.error('Error fetching portfolio projects:', error)
    throw error
  }
}