import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import { Starfield } from './Starfield'
import { DiamondLogo } from './DiamondLogo'
import { CustomCursor } from './CustomCursor'
import { NotionIcon, ZapierIcon, AIIcon, FullStackIcon } from './ServiceIcons'
import { getPortfolioProjects, type PortfolioProject } from './lib/notion'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([])
  const [portfolioLoading, setPortfolioLoading] = useState(true)
  const [portfolioError, setPortfolioError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
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
    alert('Thank you! I\'ll get back to you within 24 hours.')
  }

  return (
    <div className="app">
      <CustomCursor />
      <Starfield />
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <DiamondLogo />
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact" className="btn-primary">Book Consultation</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Enterprise-Grade Automation <span className="gradient-text">For Modern Teams</span>
          </h1>
          <p className="hero-subtitle">
            I build custom automation workflows that save you 10+ hours per week. Notion databases, Zapier integrations, AI-powered tools, and full-stack applications—delivered with precision.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary btn-large">Book Free 15-Min Consultation</a>
            <a href="#portfolio" className="btn-secondary btn-large">View Portfolio</a>
          </div>
          <p className="hero-trust">Trusted by agencies, freelancers, and growing teams</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">What I Build</h2>
          <p className="section-subtitle">Custom solutions tailored to your workflow</p>
          
          <div className="services-grid">
            <div className="service-card">
              <NotionIcon />
              <h3>Notion Automation</h3>
              <p>Custom databases, dashboards, and automated workflows that turn Notion into your command center.</p>
            </div>

            <div className="service-card">
              <ZapierIcon />
              <h3>Zapier Integration</h3>
              <p>Connect your tools seamlessly. From simple triggers to complex multi-step workflows.</p>
            </div>

            <div className="service-card">
              <AIIcon />
              <h3>AI Workflows</h3>
              <p>Leverage GPT-4, Claude, and custom AI models to automate content, analysis, and decision-making.</p>
            </div>

            <div className="service-card">
              <FullStackIcon />
              <h3>Full-Stack Development</h3>
              <p>React, Node.js, TypeScript, Supabase. Modern web apps built for performance and scalability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">Real results for real businesses</p>
          
          <div className="portfolio-grid">
            {portfolioLoading ? (
              <div className="portfolio-loading">
                <div className="spinner"></div>
                <p>Loading projects...</p>
              </div>
            ) : portfolioError ? (
              <div className="portfolio-error">
                <p>{portfolioError}</p>
              </div>
            ) : portfolioProjects.length > 0 ? (
              portfolioProjects.map((project) => (
                <div key={project.id} className="portfolio-card">
                  {project.imageUrl && (
                    <div className="portfolio-image">
                      <img src={project.imageUrl} alt={project.title} />
                    </div>
                  )}
                  <div className="portfolio-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="portfolio-tags">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    {project.projectUrl && (
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="portfolio-link"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="portfolio-empty">
                <p>No projects available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">Book a free 15-minute consultation to discuss your project</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Project Details</label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-large">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Apex Omnis Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
