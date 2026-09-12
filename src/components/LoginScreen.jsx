import React, { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (isRegistering && (!name.trim() || !email.trim() || !password || !confirmPassword)) {
      setError('Name, email, password, and confirm password are required.');
      return;
    }

    if (!isRegistering && (!email.trim() || !password)) {
      setError('Enter your email and password to continue.');
      return;
    }

    if (!email.trim().includes('@')) {
      setError('Please provide a valid email.');
      return;
    }

    if (isRegistering && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`https://loginbackends-nyzo.onrender.com/${isRegistering ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isRegistering
          ? { name: name.trim(), email: email.trim(), password, confirmPassword }
          : { email: email.trim(), password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to sign in.');
        return;
      }

      if (isRegistering) {
        setIsRegistering(false);
        setPassword('');
        setConfirmPassword('');
        setSuccess(data.message || 'Registration successful. You can now sign in.');
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
        <h1 id="login-title">{isRegistering ? 'Create your account' : 'Welcome back'}</h1>
        <p className="login-description">
          {isRegistering
            ? 'Register to access your examination dashboard.'
            : 'Sign in to access your examination dashboard.'}
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
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          )}

          {error && <p className="form-error" role="alert">{error}</p>}
          {success && <p className="form-success" role="status">{success}</p>}
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
            setSuccess('');
          }}
        >
          {isRegistering ? 'Already have an account? Sign in' : 'New candidate? Create an account'}
        </button>
      </section>
    </main>
  );
}

export default LoginScreen;