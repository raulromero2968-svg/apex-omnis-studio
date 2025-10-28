import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './index.css'
import './App.css'
import { Starfield } from './Starfield'
import { DiamondLogo } from './DiamondLogo'
import { CustomCursor } from './CustomCursor'
import { NotionIcon, ZapierIcon, AIIcon, FullStackIcon } from './ServiceIcons'
import { getPortfolioProjects, type PortfolioProject } from './lib/notion'
import ProjectDetail from './ProjectDetail'

function HomePage() {
  const navigate = useNavigate()
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

  const handleProjectClick = (project: PortfolioProject) => {
    // Generate slug from title
    const slug = project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    navigate(`/project/${slug}`)
  }

  return (
    <div className="app">
      <CustomCursor />
      <Starfield />
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <DiamondLogo />
              <span className="text-gradient">Apex Omnis Studio</span>
            </div>
            <div className="nav-links">
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#contact" className="btn-primary">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-blur hero-bg-blur-left" />
        <div className="hero-bg-blur hero-bg-blur-center" />
        <div className="hero-bg-blur hero-bg-blur-right" />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="text-gradient">Keep Your Business In Your Control</span>
            </h1>
            <p className="hero-subtitle">
              I help small businesses protect their operations from AI disruption by integrating and optimizing their systems. Stay competitive, stay efficient, and stay in control.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary btn-lg">Book Free Consultation</a>
              <a href="#portfolio" className="btn-secondary btn-lg">View My Work</a>
            </div>
            <p className="hero-trust">Helping small businesses thrive in the AI era</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How I Help You Stay Ahead</h2>
            <p className="section-subtitle">One-time projects + optional tune-ups. No ongoing retainers.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <NotionIcon />
              </div>
              <h3 className="service-title">Notion Workspace Setup</h3>
              <p className="service-desc">
                Transform Notion into your business command center. Custom databases, automated workflows, and dashboards that save you hours every week.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <ZapierIcon />
              </div>
              <h3 className="service-title">Workflow Automation</h3>
              <p className="service-desc">
                Connect your tools and eliminate repetitive tasks. From simple triggers to complex multi-step workflows that run on autopilot.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <AIIcon />
              </div>
              <h3 className="service-title">System Integration</h3>
              <p className="service-desc">
                Make your business tools work together seamlessly. CRM, email, project management, invoicing—all connected and optimized.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FullStackIcon />
              </div>
              <h3 className="service-title">Custom Solutions</h3>
              <p className="service-desc">
                Need something specific? I build custom tools and applications tailored to your unique business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-subtitle">Real solutions for real businesses</p>
          </div>

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
                <div 
                  key={project.id} 
                  className="portfolio-card portfolio-card-clickable"
                  onClick={() => handleProjectClick(project)}
                  style={{ cursor: 'pointer' }}
                >
                  {project.imageUrl && (
                    <div className="portfolio-image">
                      <img src={project.imageUrl} alt={project.title} />
                    </div>
                  )}
                  <div className="portfolio-content">
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-desc">{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="portfolio-tags">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
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
      <section id="contact" className="section">
        <div className="container-narrow">
          <div className="section-header">
            <h2 className="section-title">Ready to Take Control?</h2>
            <p className="section-subtitle">Book a free consultation to discuss how I can help your business</p>
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
              Send Message
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
              Helping small businesses stay in control
            </p>
            <p className="footer-copyright">
              © 2025 Apex Omnis Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </Router>
  )
}

export default App