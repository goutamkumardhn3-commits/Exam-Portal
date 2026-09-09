import React, { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if ((isRegistering && !name.trim()) || !email.trim() || !password) {
      setError(isRegistering ? 'Enter your name, email, and password.' : 'Enter your email and password to continue.');
      return;
    }

    if (isRegistering && password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      const response = await fetch(isRegistering ? '/api/auth/register' : '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to sign in.');
        return;
      }

      onLogin(data);
    } catch (requestError) {
      setError('The login service is unavailable. Start the backend and try again.');
    }
  };

  return (
    <main className="login-container">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-mark" aria-hidden="true">EP</div>
        <p className="eyebrow">Exam Portal</p>
        <h1 id="login-title">{isRegistering ? 'Create your account' : 'Welcome back'}</h1>
        <p className="login-description">
          {isRegistering ? 'Register to start taking examinations.' : 'Sign in to access your examination dashboard.'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn login-btn">
            {isRegistering ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          className="text-btn"
          onClick={() => {
            setIsRegistering((current) => !current);
            setError('');
          }}
        >
          {isRegistering ? 'Already have an account? Sign in' : 'New candidate? Create an account'}
        </button>

        {!isRegistering && (
          <p className="login-note">Demo account: candidate@example.com / password123</p>
        )}
      </section>
    </main>
  );
}

export default LoginScreen;