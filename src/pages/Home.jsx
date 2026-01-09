import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">✨</span>
            AI Resume Builder
          </div>
          <div className="nav-buttons">
            <Link to="/login" className="nav-btn secondary">Login</Link>
            <Link to="/register" className="nav-btn primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">AI-Powered Resume Builder</div>
          <h1 className="hero-title">
            Build <span className="highlight">ATS-Friendly</span><br/>
            Resumes in Minutes
          </h1>
          <p className="hero-subtitle">
            Transform your experience into powerful bullet points with AI. 
            Professional templates that get you hired faster.
          </p>
          
          <div className="hero-cta">
            <Link to="/register" className="cta-primary">
              Create My Resume
            </Link>
            <Link to="/dashboard" className="cta-secondary">
              View Demo
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div>Resumes Created</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div>ATS Pass Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2x</div>
              <div>Faster Interviews</div>
            </div>
          </div>
        </div>

        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-name">Harsh Dhingra</div>
              <div className="preview-badge">AI Enhanced</div>
            </div>
            <div className="preview-role">Full Stack Developer</div>
            <div className="preview-section">
              <div className="section-title">Projects</div>
              <div className="bullet">• Built blockchain gaming platform</div>
              <div className="bullet">• Developed NFT marketplace</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Everything You Need</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Enhancement</h3>
            <p>Transform raw text into ATS-optimized bullet points</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>2 Pro Templates</h3>
            <p>Classic & Modern layouts that pass ATS filters</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>5 Minutes</h3>
            <p>From blank page to PDF download in under 5 minutes</p>
          </div>
        </div>
      </section>
    </div>
  );
}
