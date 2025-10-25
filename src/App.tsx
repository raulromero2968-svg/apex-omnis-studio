import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import { getPortfolioProjects, type PortfolioProject } from './lib/notion'
import { Starfield } from './Starfield'
import { DiamondLogo } from './DiamondLogo'
import { CustomCursor } from './CustomCursor'
import { NotionIcon, ZapierIcon, AIIcon, FullStackIcon } from './ServiceIcons'
import { getPortfolioProjects, type PortfolioProject } from './lib/notion'

function App() {
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getPortfolioProjects();
      setPortfolioProjects(projects);
      setLoading(false);
    }
    fetchProjects();
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([])
  const [portfolioLoading, setPortfolioLoading] = useState(true)
  const [portfolioError, setPortfolioError] = useState<string | null>(null)

  useEffect(() => {async function fetchProjects() {
      try {
        setPortfolioLoading(true)
        const projects = await getPortfolioProjects()
        setPortfolioProjects(projects)
        setPortfolioError(null)
      } catch (error) {
        console.error('Failed to load portfolio projects:', error)
        setPortfolioError('Failed to load portfolio projects. Please try again later.')
      } finally {
        setPortfolioLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="app">
      <Starfield />
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="nav">
 HEAD
        <div className="container nav-container">
          <div className="logo">
            <DiamondLogo />
            <span className="text-gradient">Apex Omnis Studio</span>
          </div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact" className="btn-primary">Get Started</a>

        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <DiamondLogo />
              <span className="text-gradient">Apex Omnis Studio</span>
            </div>
            <div className="nav-links">
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>

              <a href="#contact" className="btn-primary">
                Book Consultation
              </a>
            </div>
 945d3d3c448fc56a61b71370b772a2c99d20ed73
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="badge">
              <span className="badge-dot"></span>
              Available for new projects
            </div>
            <h1 className="hero-title">
              Enterprise Automation<br />
              <span className="text-gradient">Built for Scale</span>
            </h1>
            <p className="hero-subtitle">
              I build production-grade automation systems using Notion, Zapier, and custom code. 
              From workflow automation to AI-powered pipelines.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary btn-lg">
                Book Free Consultation
              </a>
              <a href="#portfolio" className="btn-secondary btn-lg">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What I Build</h2>
            <p className="section-subtitle">Specialized automation solutions for modern teams</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <NotionIcon />
              </div>
              <h3 className="service-title">Notion Systems</h3>
              <p className="service-desc">
                Custom Notion workspaces with relational databases, automation, and team workflows.
              </p>
              <ul className="service-features">
                <li>Database architecture</li>
                <li>Formula engineering</li>
                <li>API integrations</li>
                <li>Team training</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <ZapierIcon />
              </div>
              <h3 className="service-title">Workflow Automation</h3>
              <p className="service-desc">
                Connect your tools and automate repetitive tasks with Zapier, Make, and custom scripts.
              </p>
              <ul className="service-features">
                <li>Multi-app workflows</li>
                <li>Data transformation</li>
                <li>Error handling</li>
                <li>Monitoring & alerts</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <AIIcon />
              </div>
              <h3 className="service-title">AI Integration</h3>
              <p className="service-desc">
                Integrate GPT-4, Claude, and other AI models into your workflows for intelligent automation.
              </p>
              <ul className="service-features">
                <li>Content generation</li>
                <li>Data analysis</li>
                <li>Document processing</li>
                <li>Custom AI agents</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FullStackIcon />
              </div>
              <h3 className="service-title">Custom Development</h3>
              <p className="service-desc">
                Full-stack development when no-code isn't enough. React, Node.js, Python, and APIs.
              </p>
              <ul className="service-features">
                <li>Web applications</li>
                <li>API development</li>
                <li>Database design</li>
                <li>Cloud deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-subtitle">Real results for real businesses</p>
          </div>

 HEAD
          <div className="portfolio-grid">
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Loading portfolio projects...</p>
              </div>
            ) : portfolioProjects.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No portfolio projects found.</p>
              </div>
            ) : (
              portfolioProjects.map((project, index) => (
                <div key={project.id} className="portfolio-card">
                  <div className={`portfolio-image portfolio-image-${(index % 3) + 1}`}>
                    {project.screenshots[0] ? (
                      <img src={project.screenshots[0]} alt={project.name} className="portfolio-icon" />
                    ) : (
                      <div className="portfolio-icon" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }} />
                    )}
                  </div>
                  <div className="portfolio-content">
                    <h3 className="portfolio-title">{project.name}</h3>
                    <p className="portfolio-desc">
                      {project.summary || project.description}
                    </p>
                    <div className="portfolio-tags">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="tag tag-primary">{tech}</span>
                      ))}
                    </div>
                    {(project.liveDemoUrl || project.documentationUrl) && (
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                        {project.liveDemoUrl && (
                          <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                            Live Demo
                          </a>
                        )}
                        {project.documentationUrl && (
                          <a href={project.documentationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">
                            Docs
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

          {portfolioLoading && (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#888' }}>
              <p style={{ fontSize: '1.125rem' }}>Loading portfolio projects...</p>
            </div>
          )}

          {portfolioError && (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#ff6b6b' }}>
              <p style={{ fontSize: '1.125rem' }}>{portfolioError}</p>
            </div>
          )}

          {!portfolioLoading && !portfolioError && portfolioProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#888' }}>
              <p style={{ fontSize: '1.125rem' }}>No portfolio projects found.</p>
            </div>
          )}

          {!portfolioLoading && !portfolioError && portfolioProjects.length > 0 && (
            <div className="portfolio-grid">
              {portfolioProjects.map((project, index) => (
                <div key={project.id} className="portfolio-card">
                  <div className={`portfolio-image portfolio-image-${(index % 3) + 1}`}>
                    {project.imageUrl && (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="portfolio-icon" 
                      />
                    )}
                  </div>
                  <div className="portfolio-content">
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-desc">{project.description}</p>
                    <div className="portfolio-tags">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className={`tag ${
                            tag.toLowerCase().includes('notion') ? 'tag-primary' :
                            tag.toLowerCase().includes('zapier') ? 'tag-accent' :
                            tag.toLowerCase().includes('ai') ? 'tag-purple' :
                            'tag-primary'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.projectUrl && (
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ marginTop: '1rem', display: 'inline-block' }}
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

 945d3d3c448fc56a61b71370b772a2c99d20ed73

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container-narrow">
          <div className="section-header">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle">Book a free 15-minute consultation to discuss your project</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell me about your project</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary btn-lg btn-block">
              Book Free Consultation
            </button>

            <p className="form-note">
              I'll respond within 24 hours
            </p>
          </form>
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
              Enterprise-grade automation for modern teams
            </p>
            <div className="footer-contact">
              <a href="mailto:contact@apexomnis.studio">
                contact@apexomnis.studio
              </a>
            </div>
            <p className="footer-copyright">
              © 2025 Apex Omnis Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
