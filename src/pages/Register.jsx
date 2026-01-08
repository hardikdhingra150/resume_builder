import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, googleSignIn } = useAuth(); // Changed from signInWithGoogle to googleSignIn

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      console.log('Signup successful!');
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.message.includes('already registered') || err.message.includes('already exists')) {
        setError('This email is already registered. Please login instead.');
      } else if (err.message.includes('Invalid email')) {
        setError('Invalid email address.');
      } else if (err.message.includes('Password')) {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await googleSignIn(); // Changed from signInWithGoogle to googleSignIn
      // Google OAuth will redirect automatically
    } catch (err) {
      console.error('Google signin error:', err);
      setError(err.message || 'Failed to sign in with Google.');
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-orb auth-orb-1"></div>
      <div className="auth-orb auth-orb-2"></div>
      <div className="auth-orb auth-orb-3"></div>
      
      <div className="auth-card">
        <div className="auth-card-accent"></div>
        
        <div className="auth-dots auth-dots-left">
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
        </div>
        <div className="auth-dots auth-dots-right">
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
          <div className="auth-dot"></div>
        </div>

        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Start building your AI-powered resume</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password (min 6 characters)</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-divider">
          <span className="auth-divider-text">or</span>
        </div>

        <button onClick={handleGoogleSignIn} className="google-btn" disabled={loading}>
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
