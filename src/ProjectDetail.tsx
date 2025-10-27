import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  techStack: string[];
  liveDemo: string;
  projectUrl: string;
  documentation: string;
  thumbnailImage: string;
  detailImages: string[];
  slug: string;
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        const foundProject = data.projects.find((p: Project) => p.slug === slug);
        setProject(foundProject || null);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
          >
            ← Back to Portfolio
          </button>
        </div>
      </header>

      {/* Project Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Title & Category */}
        <div className="mb-8">
          <div className="text-cyan-400 text-sm font-semibold mb-2">{project.category}</div>
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-300">{project.description}</p>
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {project.detailImages.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden border border-gray-800">
              <img
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        {project.techStack.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 border border-cyan-500/30 text-white rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
            >
              View Live Demo →
            </a>
          )}
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Project Details →
            </a>
          )}
          {project.documentation && (
            <a
              href={project.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Documentation →
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
