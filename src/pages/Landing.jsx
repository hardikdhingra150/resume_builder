import { useNavigate } from 'react-router-dom';


export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Simple Navbar */}
      <nav className="nav">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">📄</span>
            <span className="logo-text">ResumeAI</span>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/login')} className="nav-link">
              Sign In
            </button>
            <button onClick={() => navigate('/register')} className="nav-cta">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Powered by AI
          </div>
          
          <h1 className="hero-title">
            Build Your Perfect Resume
            <span className="hero-highlight"> in Minutes</span>
          </h1>
          
          <p className="hero-description">
            Let AI help you create a professional resume that stands out. 
            Add your details, enhance with AI, and download instantly.
          </p>
          
          <div className="hero-buttons">
            <button onClick={() => navigate('/register')} className="btn-primary">
              Start Building Free
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary">
              Sign In
            </button>
          </div>

          {/* Simple Stats */}
          <div className="stats">
            <div className="stat">
              <div className="stat-value">1000+</div>
              <div className="stat-label">Users</div>
            </div>
            <div className="stat">
              <div className="stat-value">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat">
              <div className="stat-value">2 min</div>
              <div className="stat-label">Avg Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="features">
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">AI Enhancement</h3>
            <p className="feature-text">
              Transform your text into professional, impactful content
            </p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">ATS Friendly</h3>
            <p className="feature-text">
              Get past automated screening with optimized formatting
            </p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Quick Export</h3>
            <p className="feature-text">
              Download PDF instantly and update anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 ResumeAI. Made with AI.</p>
      </footer>
    </div>
  );
}
