import React from 'react';
import { formatTime } from '../utils/examUtils';

function ExamScreen({
  candidateName,
  examQuestions,
  currentIndex,
  setCurrentIndex,
  selectedOptions,
  questionStatus,
  timeLeft,
  handleOptionSelect,
  handleSaveAndNext,
  handleMarkForReview,
  handleSubmitExam
}) {
  const currentQuestion = examQuestions[currentIndex];

  return (
    <div className="exam-container">
      <header className="exam-header">
        <div className="header-title">ONLINE EXAMINATION PORTAL</div>
        <div className="candidate-info">
          <span>Candidate Name: <strong>{candidateName}</strong></span>
        </div>
      </header>

      <div className="exam-subheader">
        <div className="section-name">Section: General Knowledge</div>
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      </div>

      <div className="exam-body">
        <div className="question-panel">
          <div className="question-counter">
            Question {currentIndex + 1} of {examQuestions.length}
          </div>
          <div className="question-text">
            {currentQuestion.question}
          </div>
          <div className="options-list">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`option-item ${selectedOptions[currentQuestion.id] === option ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={selectedOptions[currentQuestion.id] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <span>{String.fromCharCode(65 + idx)}. {option}</span>
              </label>
            ))}
          </div>

          <div className="footer-buttons">
            <button
              className="btn prev-btn"
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
            >
              &lt; Previous
            </button>
            <button className="btn review-btn" onClick={handleMarkForReview}>
              Mark for Review & Next
            </button>
            <button className="btn save-btn" onClick={handleSaveAndNext}>
              Save & Next
            </button>
          </div>
        </div>

        <div className="palette-panel">
          <h3>Question Palette</h3>
          <div className="palette-grid">
            {examQuestions.map((q, idx) => {
              const status = questionStatus[q.id];
              return (
                <button
                  key={q.id}
                  className={`palette-btn ${status} ${currentIndex === idx ? 'active-current' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className="submit-section">
            <button className="btn submit-exam-btn" onClick={handleSubmitExam}>
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamScreen;