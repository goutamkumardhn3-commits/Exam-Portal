import React, { useState, useEffect } from 'react';
import './App.css';
import { questionsData } from './components/generalKnowledge';
import mixpanel from './config/mixpanelConfig';

const QUESTION_COUNT_PER_EXAM = 25;

const getRandomQuestions = (pool, count) => {
  const shuffled = [...pool];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

function App() {
  // App navigation state: 'welcome', 'exam', or 'submitted'
  const [step, setStep] = useState('welcome');

  // Candidate details
  const [candidateName, setCandidateName] = useState('');

  // Exam states
  const [examQuestions, setExamQuestions] = useState(() =>
    getRandomQuestions(questionsData, QUESTION_COUNT_PER_EXAM)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatus, setQuestionStatus] = useState(() =>
    getRandomQuestions(questionsData, QUESTION_COUNT_PER_EXAM).reduce(
      (acc, q) => ({ ...acc, [q.id]: 'not-visited' }),
      {}
    )
  );

  // Timer state (10 minutes = 600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);

  // Timer Countdown Effect
  useEffect(() => {
    if (step !== 'exam' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStep('submitted');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, step]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // Mark current question as visited
  useEffect(() => {
    if (step === 'exam' && examQuestions.length > 0) {
      const currentQId = examQuestions[currentIndex].id;
      if (questionStatus[currentQId] === 'not-visited') {
        setQuestionStatus((prev) => ({ ...prev, [currentQId]: 'not-answered' }));
      }
    }
  }, [currentIndex, step, examQuestions, questionStatus]);

  const handleStartExam = (e) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      alert('Please enter your name.');
      return;
    }

    const randomQuestions = getRandomQuestions(questionsData, QUESTION_COUNT_PER_EXAM);
    setExamQuestions(randomQuestions);
    setCurrentIndex(0);
    setSelectedOptions({});
    setQuestionStatus(
      randomQuestions.reduce((acc, q) => ({ ...acc, [q.id]: 'not-visited' }), {})
    );

    mixpanel.track('Exam Started', {
      candidate_name: candidateName,
      total_questions: randomQuestions.length,
      timestamp: new Date().toISOString()
    });
    setStep('exam');
  };

  const handleOptionSelect = (option) => {
    const currentQId = examQuestions[currentIndex].id;
    setSelectedOptions((prev) => ({ ...prev, [currentQId]: option }));

    mixpanel.track('Question Answered', {
      question_id: currentQId,
      question_text: examQuestions[currentIndex].question,
      selected_answer: option,
      is_correct: option === examQuestions[currentIndex].answer,
      timestamp: new Date().toISOString()
    });
  };

  const handleSaveAndNext = () => {
    const currentQId = examQuestions[currentIndex].id;
    const isAnswered = selectedOptions[currentQId] !== undefined;

    setQuestionStatus((prev) => ({
      ...prev,
      [currentQId]: isAnswered ? 'answered' : 'not-answered'
    }));

    if (currentIndex < examQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleMarkForReview = () => {
    const currentQId = examQuestions[currentIndex].id;
    const isAnswered = selectedOptions[currentQId] !== undefined;

    setQuestionStatus((prev) => ({
      ...prev,
      [currentQId]: isAnswered ? 'answered-review' : 'review'
    }));

    if (currentIndex < examQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Calculate score details
  const calculateResults = () => {
    let correctCount = 0;
    let attemptedCount = 0;

    examQuestions.forEach((q) => {
      const userSelected = selectedOptions[q.id];
      if (userSelected !== undefined) {
        attemptedCount++;
        if (userSelected === q.answer) {
          correctCount++;
        }
      }
    });

    const totalQuestions = examQuestions.length;
    const score = correctCount;
    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    return {
      totalQuestions,
      attemptedCount,
      correctCount,
      score,
      percentage
    };
  };

  // 1. WELCOME SCREEN
  if (step === 'welcome') {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <h2>Online Examination Portal</h2>
          <p>Please enter your details to begin the test.</p>
          <form onSubmit={handleStartExam} className="welcome-form">
            <div className="form-group">
              <label>Candidate Name :</label>
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
        </div>
      </div>
    );
  }

  // 3. SUBMITTED SCREEN (RESULTS)
  if (step === 'submitted') {
    const results = calculateResults();
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
          <button className="btn start-exam-btn" onClick={() => window.location.reload()}>
            Retake Exam
          </button>
        </div>
      </div>
    );
  }

  // 2. EXAM INTERFACE SCREEN
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
            <button
              className="btn submit-exam-btn"
              onClick={() => {
                const results = calculateResults();
                mixpanel.track('Exam Submitted', {
                  candidate_name: candidateName,
                  total_questions: results.totalQuestions,
                  attempted: results.attemptedCount,
                  correct_answers: results.correctCount,
                  score: results.score,
                  percentage: parseFloat(results.percentage),
                  timestamp: new Date().toISOString()
                });
                setStep('submitted');
              }}
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;