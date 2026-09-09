import React from 'react';

function WelcomeScreen({ candidateName, setCandidateName, onStartExam, userEmail, onLogout }) {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <p className="eyebrow">Signed in as {userEmail}</p>
        <h2>Online Examination Portal</h2>
        <p>Please enter your details to begin the test.</p>
        <form onSubmit={onStartExam} className="welcome-form">
          <div className="form-group">
            <label>Candidate Name:</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn start-exam-btn">Start Exam</button>
        </form>
        <button type="button" className="text-btn" onClick={onLogout}>Sign out</button>
      </div>
    </div>
  );
}

export default WelcomeScreen;