import React from 'react';

function ResultScreen({ candidateName, results, onRetakeExam }) {
  return (
    <div className="result-container">
      <div className="result-card">
        <h2>Exam Result Summary</h2>
        <p>Candidate Name: <strong>{candidateName}</strong></p>
        <hr className="result-divider" />
        <div className="result-stats">
          <div className="stat-row">
            <span>Total Questions:</span>
            <strong>{results.totalQuestions}</strong>
          </div>
          <div className="stat-row">
            <span>Attempted Questions:</span>
            <strong>{results.attemptedCount}</strong>
          </div>
          <div className="stat-row">
            <span>Correct Answers:</span>
            <strong className="text-success">{results.correctCount}</strong>
          </div>
          <div className="stat-row">
            <span>Obtained Marks:</span>
            <strong>{results.score} / {results.totalQuestions}</strong>
          </div>
          <div className="stat-row percentage-row">
            <span>Percentage:</span>
            <strong className="text-primary">{results.percentage}%</strong>
          </div>
        </div>
        <button className="btn start-exam-btn" onClick={onRetakeExam}>
          Retake Exam
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;