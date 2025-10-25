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
            <a href="#contact" className="btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Keep Your Business <span className="gradient-text">In Your Control</span>
          </h1>
          <p className="hero-subtitle">
            I help small businesses protect their operations from AI disruption by integrating and optimizing their systems. Stay competitive, stay efficient, and stay in control.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary btn-large">Book Free Consultation</a>
            <a href="#portfolio" className="btn-secondary btn-large">View My Work</a>
          </div>
          <p className="hero-trust">Helping small businesses thrive in the AI era</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">How I Help You Stay Ahead</h2>
          <p className="section-subtitle">One-time projects + optional tune-ups. No ongoing retainers.</p>
          
          <div className="services-grid">
            <div className="service-card">
              <NotionIcon />
              <h3>Notion Workspace Setup</h3>
              <p>Transform Notion into your business command center. Custom databases, automated workflows, and dashboards that save you hours every week.</p>
            </div>

            <div className="service-card">
              <ZapierIcon />
              <h3>Workflow Automation</h3>
              <p>Connect your tools and eliminate repetitive tasks. From simple triggers to complex multi-step workflows that run on autopilot.</p>
            </div>

            <div className="service-card">
              <AIIcon />
              <h3>System Integration</h3>
              <p>Make your business tools work together seamlessly. CRM, email, project management, invoicing—all connected and optimized.</p>
            </div>

            <div className="service-card">
              <FullStackIcon />
              <h3>Custom Solutions</h3>
              <p>Need something specific? I build custom tools and applications tailored to your unique business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">Real solutions for real businesses</p>
          
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
          <h2 className="section-title">Ready to Take Control?</h2>
          <p className="section-subtitle">Book a free consultation to discuss how I can help your business</p>
          
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
              <label htmlFor="message">Tell me about your business</label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What challenges are you facing? What would you like to automate or optimize?"
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
          <p>&copy; 2025 Apex Omnis Studio. Helping small businesses stay in control.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
