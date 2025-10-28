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
  // New fields for better showcase
  howItWorks?: string;
  demoUrl?: string;
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

      {/* Hero Section - Side by Side Layout */}
      <section className="section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '4rem',
            alignItems: 'start'
          }}>
            {/* LEFT SIDE - Project Info */}
            <div>
              <div style={{ color: '#22d3ee', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                {project.category}
              </div>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1.2'
              }}>
                {project.title}
              </h1>
              <p style={{ 
                fontSize: '1.125rem', 
                color: '#9ca3af', 
                marginBottom: '2rem',
                lineHeight: '1.7'
              }}>
                {project.description}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div className="portfolio-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
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

              {/* How It Works Section */}
              {project.howItWorks && (
                <div style={{ 
                  padding: '2rem',
                  background: 'rgba(17, 24, 39, 0.5)',
                  border: '1px solid rgba(55, 65, 81, 0.5)',
                  borderRadius: '0.75rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '600', 
                    marginBottom: '1rem', 
                    color: '#22d3ee' 
                  }}>
                    How It Works
                  </h3>
                  <p style={{ 
                    color: '#d1d5db', 
                    lineHeight: '1.7',
                    fontSize: '1rem'
                  }}>
                    {project.howItWorks}
                  </p>
                </div>
              )}

              {/* Tech Stack - As Integration Story */}
              {project.techStack && project.techStack.length > 0 && (
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '1rem', 
                    color: 'white' 
                  }}>
                    Technology Integration
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.75rem', 
                    flexWrap: 'wrap' 
                  }}>
                    {project.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(34, 211, 238, 0.1)',
                          border: '1px solid rgba(34, 211, 238, 0.3)',
                          borderRadius: '0.5rem',
                          color: '#22d3ee',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE - Interactive Demo or Hero Image */}
            <div>
              {project.demoUrl ? (
                // Interactive Demo (iframe)
                <div style={{
                  position: 'relative',
                  paddingBottom: '75%', // 4:3 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  boxShadow: '0 20px 60px rgba(34, 211, 238, 0.2)'
                }}>
                  <iframe
                    src={project.demoUrl}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    title={`${project.title} Demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : project.imageUrl ? (
                // Hero Image
                <div style={{
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  boxShadow: '0 20px 60px rgba(34, 211, 238, 0.2)'
                }}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Screenshots Gallery */}
      {project.detailImages && project.detailImages.length > 1 && (
        <section className="section" style={{ paddingTop: '0', paddingBottom: '60px' }}>
          <div className="container">
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              More Screenshots
            </h2>
            <div style={{ 
              display: 'grid', 
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
            }}>
              {project.detailImages.slice(1).map((image, index) => (
                <div 
                  key={index}
                  style={{
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(55, 65, 81, 0.5)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 211, 238, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Screenshot ${index + 2}`}
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
        </section>
      )}

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