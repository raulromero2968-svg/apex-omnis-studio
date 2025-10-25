import { useState } from 'react'
import './index.css'
import './App.css'
import { Starfield } from './Starfield'
import { DiamondLogo } from './DiamondLogo'
import { CustomCursor } from './CustomCursor'
import { NotionIcon, ZapierIcon, AIIcon, FullStackIcon } from './ServiceIcons'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

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
              Enterprise-Grade Automation{" "}
              <span className="text-gradient">
                For Modern Teams
              </span>
            </h1>
            <p className="hero-subtitle">
              I build custom automation workflows that save you 10+ hours per week. Notion databases, Zapier integrations, AI-powered tools, and full-stack applications—delivered with precision.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary btn-lg">
                Book Free 15-Min Consultation
              </a>
              <a href="#portfolio" className="btn-secondary btn-lg">
                View Portfolio
              </a>
            </div>
            <p className="hero-trust">
              Trusted by agencies, freelancers, and growing teams
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What I Build</h2>
            <p className="section-subtitle">Custom solutions tailored to your workflow</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <NotionIcon />
              </div>
              <h3 className="service-title">Notion Automation</h3>
              <p className="service-desc">
                Custom databases, dashboards, and automated workflows that turn Notion into your command center.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <ZapierIcon />
              </div>
              <h3 className="service-title">Zapier Integration</h3>
              <p className="service-desc">
                Connect your tools seamlessly. From simple triggers to complex multi-step workflows.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <AIIcon />
              </div>
              <h3 className="service-title">AI Workflows</h3>
              <p className="service-desc">
                Leverage GPT-4, Claude, and custom AI models to automate content, analysis, and decision-making.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FullStackIcon />
              </div>
              <h3 className="service-title">Full-Stack Development</h3>
              <p className="service-desc">
                React, Node.js, TypeScript, Supabase. Modern web apps built for performance and scalability.
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
            <p className="section-subtitle">Real results for real businesses</p>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="portfolio-image portfolio-image-1">
                <img src="/museum-tracker-icon.png" alt="Museum Tracker" className="portfolio-icon" />
              </div>
              <div className="portfolio-content">
                <h3 className="portfolio-title">Museum Tracker System</h3>
                <p className="portfolio-desc">
                  Automated NYC museum event tracking with Notion + Zapier. Saves 5 hours/week.
                </p>
                <div className="portfolio-tags">
                  <span className="tag tag-primary">Notion</span>
                  <span className="tag tag-accent">Zapier</span>
                </div>
              </div>
            </div>

            <div className="portfolio-card">
              <div className="portfolio-image portfolio-image-2">
                <img src="/ai-pipeline-icon.png" alt="AI Pipeline" className="portfolio-icon" />
              </div>
              <div className="portfolio-content">
                <h3 className="portfolio-title">AI Content Pipeline</h3>
                <p className="portfolio-desc">
                  Automated content analysis and categorization using Claude AI + Google Sheets.
                </p>
                <div className="portfolio-tags">
                  <span className="tag tag-purple">AI</span>
                  <span className="tag tag-accent">Zapier</span>
                </div>
              </div>
            </div>

            <div className="portfolio-card">
              <div className="portfolio-image portfolio-image-3">
                <img src="/data-dashboard-icon.png" alt="Data Dashboard" className="portfolio-icon" />
              </div>
              <div className="portfolio-content">
                <h3 className="portfolio-title">Data Analysis Dashboard</h3>
                <p className="portfolio-desc">
                  React dashboard with real-time analytics and automated reporting.
                </p>
                <div className="portfolio-tags">
                  <span className="tag tag-primary">React</span>
                  <span className="tag tag-purple">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


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

