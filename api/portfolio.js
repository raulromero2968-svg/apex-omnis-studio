const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = async (req, res) => {
  try {
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
      
      // Get title
      const title = properties['Project Name']?.title?.[0]?.plain_text || 'Untitled Project';
      
      // Get description
      const description = properties.Description?.rich_text?.[0]?.plain_text || '';
      
      // Get category
      const category = properties.Category?.select?.name || 'Uncategorized';
      
      // Get tags
      const tags = properties.Tags?.multi_select?.map(tag => tag.name) || [];
      
      // Get tech stack
      const techStack = properties['Tech Stack']?.multi_select?.map(tech => tech.name) || [];
      
      // Get links
      const liveDemo = properties['Live Demo']?.url || '';
      const projectUrl = properties['Project URL']?.url || '';
      const documentation = properties.Documentation?.url || '';
      
      // NEW: Get "How It Works" explanation
      const howItWorks = properties['How It Works']?.rich_text?.[0]?.plain_text || '';
      
     // NEW: Get Demo URL for iframe embedding
const demoUrl = properties['Live Demo URL']?.url || '';
      
      // Get screenshots (array of images)
      const screenshots = properties.Screenshots?.files || [];
      
      // First image is thumbnail
      const thumbnailImage = screenshots[0]?.file?.url || screenshots[0]?.external?.url || '';
      const detailImages = screenshots.map(img => img.file?.url || img.external?.url || '').filter(Boolean);
      
      // Generate URL slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      return {
        id: page.id,
        title,
        description,
        category,
        tags,
        techStack,
        liveDemo,
        projectUrl,
        documentation,
        howItWorks,
        demoUrl,
        imageUrl: thumbnailImage,
        detailImages,
        slug,
      };
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
