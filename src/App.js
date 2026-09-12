import React, { useState, useEffect } from 'react';
import './App.css';
import { questionsData } from './components/generalKnowledge';
import mixpanel from './config/mixpanelConfig';
import { getRandomQuestions } from './utils/examUtils';

import WelcomeScreen from './components/WelcomeScreen';
import ExamScreen from './components/ExamScreen';
import ResultScreen from './components/ResultScreen';
import LoginScreen from './components/LoginScreen';

const QUESTION_COUNT_PER_EXAM = 25;

function App() {
  const [step, setStep] = useState('login');
  const [userEmail, setUserEmail] = useState('');
  const [candidateName, setCandidateName] = useState('');
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

  const handleLogin = (loginData, email) => {
    const userEmail = loginData.user?.email || loginData.email || email;
    setUserEmail(userEmail);

    if (loginData.token) {
      window.localStorage.setItem('examPortalToken', loginData.token);
    }

    setStep('welcome');
  };

  const handleLogout = () => {
    setUserEmail('');
    setCandidateName('');
    window.localStorage.removeItem('examPortalToken');
    setStep('login');
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

    return { totalQuestions, attemptedCount, correctCount, score, percentage };
  };

  const handleSubmitExam = () => {
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
  };

  if (step === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (step === 'welcome') {
    return (
      <WelcomeScreen
        candidateName={candidateName}
        setCandidateName={setCandidateName}
        onStartExam={handleStartExam}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
    );
  }

  if (step === 'submitted') {
    return (
      <ResultScreen
        candidateName={candidateName}
        results={calculateResults()}
        onRetakeExam={() => window.location.reload()}
      />
    );
  }

  return (
    <ExamScreen
      candidateName={candidateName}
      examQuestions={examQuestions}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      selectedOptions={selectedOptions}
      questionStatus={questionStatus}
      timeLeft={timeLeft}
      handleOptionSelect={handleOptionSelect}
      handleSaveAndNext={handleSaveAndNext}
      handleMarkForReview={handleMarkForReview}
      handleSubmitExam={handleSubmitExam}
    />
  );
}

export default App;