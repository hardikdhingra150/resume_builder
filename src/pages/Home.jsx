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
          <div className="hero-badge">AI-Powered</div>
          <h1 className="hero-title">
            Build <span className="highlight">ATS-Friendly</span><br/>
            Resumes in <span className="highlight">Minutes</span>
          </h1>
          <p className="hero-subtitle">
            Transform raw experience into powerful, recruiter-approved bullet points. 
            2 professional templates that get you hired faster.
          </p>
          
          <div className="hero-cta">
            <Link to="/register" className="cta-primary">
              ✨ Create My Resume
            </Link>
            <Link to="/dashboard" className="cta-secondary">
              👁️ Live Demo
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

        {/* GENERIC Demo Resume - No personal name */}
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-title">Full Stack Developer</div>
              <div className="preview-badge">AI Enhanced</div>
            </div>
            <div className="preview-role">Software Engineer</div>
            <div className="preview-section">
              <div className="section-title">Recent Projects</div>
              <div className="bullet">• Built blockchain gaming platform with React & Web3</div>
              <div className="bullet">• Developed NFT marketplace on Polygon network</div>
              <div className="bullet">• Created real-time dashboard with Next.js & Firebase</div>
            </div>
            <div className="preview-footer">
              <div className="tech-stack">
                React • Node.js • Solidity • Firebase • Tailwind
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Fixed spacing & better design */}
      <section className="features-section">
        <h2 className="section-title">Why Developers Love Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Bullet Magic</h3>
            <p>Raw text → Professional bullet points in seconds. ATS-optimized automatically.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>2 Pro Templates</h3>
            <p>Classic single-column + Modern two-column. Both recruiter approved.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Blank page to PDF download in under 5 minutes. No design skills needed.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Auto-Save</h3>
            <p>Everything saves automatically. Pick up where you left off anytime.</p>
          </div>
        </div>
        
        <div className="cta-bottom">
          <Link to="/register" className="cta-primary large">
            Start Building Your Resume → 
          </Link>
        </div>
      </section>
    </div>
  );
}
