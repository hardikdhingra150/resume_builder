import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="home-content">
          <div className="home-badge">✨ ResumeAI</div>
          <h1 className="home-title">
            Build Your Perfect Resume<br />
            <span className="home-title-accent">in Minutes</span>
          </h1>
          <p className="home-subtitle">
            Let AI help you create a professional resume that stands out. Add your details, enhance with AI, and download instantly.
          </p>
          
          <div className="home-buttons">
            <button onClick={() => navigate('/signup')} className="home-btn-primary">
              Start Building Free
            </button>
            <button onClick={() => navigate('/login')} className="home-btn-secondary">
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div className="home-stats">
            <div className="home-stat">
              <div className="home-stat-number">1000+</div>
              <div className="home-stat-label">Users</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-number">95%</div>
              <div className="home-stat-label">Success Rate</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-number">2 min</div>
              <div className="home-stat-label">Avg Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="home-features">
        <div className="home-features-container">
          <div className="home-feature">
            <div className="home-feature-icon">✨</div>
            <h3 className="home-feature-title">AI Enhancement</h3>
            <p className="home-feature-desc">Transform your text into professional, impactful content</p>
          </div>

          <div className="home-feature">
            <div className="home-feature-icon">🎯</div>
            <h3 className="home-feature-title">ATS Friendly</h3>
            <p className="home-feature-desc">Get past automated screening with optimized formatting</p>
          </div>

          <div className="home-feature">
            <div className="home-feature-icon">⚡</div>
            <h3 className="home-feature-title">Quick Export</h3>
            <p className="home-feature-desc">Download PDF instantly and update anytime</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="home-footer">
        <p>© 2026 ResumeAI. Made with AI.</p>
      </div>
    </div>
  );
}
