import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Starfield } from './Starfield';
import { DiamondLogo } from './DiamondLogo';
import { CustomCursor } from './CustomCursor';

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
  imageUrl: string;
  detailImages: string[];
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
        const foundProject = data.projects.find((p: any) => {
          const projectSlug = p.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          return projectSlug === slug;
        });
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
      <div className="app">
        <CustomCursor />
        <Starfield />
        <div className="portfolio-loading">
          <div className="spinner"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="app">
        <CustomCursor />
        <Starfield />
        <nav className="nav">
          <div className="container">
            <div className="nav-content">
              <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <DiamondLogo />
                <span className="text-gradient">Apex Omnis Studio</span>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <div className="portfolio-error">
              <h2>Project not found</h2>
              <button onClick={() => navigate('/')} className="btn-primary">
                ← Back to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="app">
      <CustomCursor />
      <Starfield />
      
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <DiamondLogo />
              <span className="text-gradient">Apex Omnis Studio</span>
            </div>
            <div className="nav-links">
              <button onClick={() => navigate('/')} className="btn-secondary">
                ← Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Project Detail Section */}
      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          {/* Project Header */}
          <div className="section-header">
            <div className="text-cyan-400" style={{ color: '#22d3ee', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              {project.category}
            </div>
            <h1 className="section-title">{project.title}</h1>
            <p className="section-subtitle">{project.description}</p>
          </div>

          {/* Project Images */}
          {project.detailImages && project.detailImages.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ 
                display: 'grid', 
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
              }}>
                {project.detailImages.map((image, index) => (
                  <div 
                    key={index}
                    style={{
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      border: '1px solid rgba(55, 65, 81, 0.5)',
                    }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Tags
              </h3>
              <div className="portfolio-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Tech Stack
              </h3>
              <div className="portfolio-tags">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Live Demo →
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Project Details →
              </a>
            )}
            {project.documentation && (
              <a
                href={project.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Documentation →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <DiamondLogo />
              <span className="text-gradient">Apex Omnis Studio</span>
            </div>
            <p className="footer-tagline">
              Helping small businesses stay in control
            </p>
            <p className="footer-copyright">
              © 2025 Apex Omnis Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
