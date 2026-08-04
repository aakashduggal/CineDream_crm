import React, { useState } from 'react';

const PRESETS = [
  { name: "Sarah Connor", role: "Line Producer", username: "sarah", pass: "admin" },
  { name: "Aditya S.", role: "Executive Producer", username: "aditya", pass: "admin" },
  { name: "James C.", role: "Director", username: "james", pass: "admin" },
  { name: "Marcus A.", role: "Production Manager", username: "marcus", pass: "admin" }
];

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Find preset matching username and password
    const user = PRESETS.find(p => p.username === username.trim().toLowerCase() && p.pass === password);
    
    if (user) {
      setError('');
      onLoginSuccess(`${user.name} (${user.role})`);
    } else {
      setError('Invalid username or password. (Hint: use Quick Login presets below)');
    }
  };

  const handleQuickLogin = (preset) => {
    setUsername(preset.username);
    setPassword(preset.pass);
    setError('');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-glow-bg"></div>
      <div className="login-glow-bg-left"></div>

      <div className="login-card">
        <div className="login-card-header">
          <h2>PRODUCTION CRM</h2>
          <p>Film Production & Budget Planner Portal</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="action-btn" style={{ justifyContent: 'center', padding: '12px', marginTop: '8px' }}>
            Sign In ➔
          </button>
        </form>

        <div className="login-presets">
          <div className="login-presets-title">Quick Role Presets</div>
          <div className="login-presets-grid" style={{ marginTop: '12px' }}>
            {PRESETS.map(preset => (
              <button
                key={preset.username}
                type="button"
                className="preset-pill-btn"
                onClick={() => handleQuickLogin(preset)}
              >
                <span className="preset-pill-role">{preset.role}</span>
                <span style={{ fontWeight: '500' }}>{preset.name}</span>
                <span style={{ fontSize: '9px', color: 'hsl(var(--text-muted))' }}>user: {preset.username} / pwd: admin</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
