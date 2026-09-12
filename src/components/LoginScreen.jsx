import React, { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }

    try {
      const response = await fetch('https://loginbackends-nyzo.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to sign in.');
        return;
      }

      onLogin(data, email.trim());
    } catch (requestError) {
      setError('The login service is unavailable. Please try again.');
    }
  };

  return (
    <main className="login-container">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-mark" aria-hidden="true">EP</div>
        <p className="eyebrow">Exam Portal</p>
        <h1 id="login-title">Welcome back</h1>
        <p className="login-description">
          Sign in to access your examination dashboard.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
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
            Sign in
          </button>
        </form>

      </section>
    </main>
  );
}

export default LoginScreen;