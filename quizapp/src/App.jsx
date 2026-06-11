import { useState, useCallback, useEffect } from "react";
import { quizzes } from "./data/quizzes";
import { randomizeQuiz } from "./utils/shuffle";
import { calculateScore } from "./utils/scoring";
import {
  saveAttemptState,
  loadAttemptState,
  clearAttemptState,
  saveBestScore,
} from "./utils/storage";
import QuizSelection from "./components/QuizSelection";
import QuizAttempt from "./components/QuizAttempt";
import ResultDashboard from "./components/ResultDashboard";
import ReviewAnswers from "./components/ReviewAnswers";

export default function App() {
  const [quizStatus, setQuizStatus] = useState("selection"); // selection | attempt | result | review
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [scoreData, setScoreData] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [initialState, setInitialState] = useState(null);

  // On mount: restore saved attempt from localStorage
  useEffect(() => {
    const saved = loadAttemptState();
    if (saved && saved.quizStatus === "attempt") {
      const quiz = quizzes.find((q) => q.id === saved.quizId);
      if (quiz) {
        setSelectedQuiz(quiz);
        setRandomizedQuestions(saved.randomizedQuestions);
        setUserAnswers(saved.userAnswers || {});
        setCheckedQuestions(saved.checkedQuestions || {});
        setQuizStatus("attempt");

        // Calculate remaining time
        const totalDuration = quiz.durationMinutes * 60;
        const elapsed = Math.floor((Date.now() - saved.startTime) / 1000);
        const remaining = Math.max(0, totalDuration - elapsed);

        if (remaining <= 0) {
          // Time already expired while away
          handleSubmit(
            saved.userAnswers || {},
            saved.checkedQuestions || {},
            totalDuration,
            quiz,
            saved.randomizedQuestions
          );
          return;
        }

        setInitialState({
          ...saved,
          timerSeconds: remaining,
        });
      }
    }
  }, []);

  const handleStartQuiz = useCallback((quiz) => {
    const questions = randomizeQuiz(quiz.questions);
    setSelectedQuiz(quiz);
    setRandomizedQuestions(questions);
    setUserAnswers({});
    setCheckedQuestions({});
    setScoreData(null);
    setTimeTaken(0);
    setQuizStatus("attempt");
    setInitialState({
      currentQuestionIndex: 0,
      userAnswers: {},
      checkedQuestions: {},
      timerSeconds: quiz.durationMinutes * 60,
      startTime: Date.now(),
    });

    // Save initial state
    saveAttemptState({
      quizId: quiz.id,
      randomizedQuestions: questions,
      currentQuestionIndex: 0,
      userAnswers: {},
      checkedQuestions: {},
      score: 0,
      timerSeconds: quiz.durationMinutes * 60,
      quizStatus: "attempt",
      startTime: Date.now(),
    });
  }, []);

  const handleSubmit = useCallback(
    (answers, checked, elapsed, quizOverride, questionsOverride) => {
      const quiz = quizOverride || selectedQuiz;
      const questions = questionsOverride || randomizedQuestions;

      setUserAnswers(answers);
      setCheckedQuestions(checked);
      setTimeTaken(elapsed);

      const score = calculateScore(quiz, questions, answers, checked);
      setScoreData(score);
      setQuizStatus("result");

      // Save best score
      saveBestScore(quiz.id, score);

      // Clear attempt from localStorage
      clearAttemptState();
    },
    [selectedQuiz, randomizedQuestions]
  );

  const handleRetake = useCallback(() => {
    if (selectedQuiz) {
      clearAttemptState();
      handleStartQuiz(selectedQuiz);
    }
  }, [selectedQuiz, handleStartQuiz]);

  const handleGoHome = useCallback(() => {
    clearAttemptState();
    setQuizStatus("selection");
    setSelectedQuiz(null);
    setRandomizedQuestions([]);
    setUserAnswers({});
    setCheckedQuestions({});
    setScoreData(null);
    setInitialState(null);
  }, []);

  const handleReview = useCallback(() => {
    setQuizStatus("review");
  }, []);

  const handleBackToResult = useCallback(() => {
    setQuizStatus("result");
  }, []);

  const handleQuitAttempt = useCallback(() => {
    clearAttemptState();
    handleGoHome();
  }, [handleGoHome]);

  return (
    <>
      {quizStatus === "selection" && (
        <QuizSelection onStartQuiz={handleStartQuiz} />
      )}

      {quizStatus === "attempt" && selectedQuiz && (
        <QuizAttempt
          quiz={selectedQuiz}
          questions={randomizedQuestions}
          initialState={initialState}
          onSubmit={(answers, checked, elapsed) =>
            handleSubmit(answers, checked, elapsed)
          }
          onQuit={handleQuitAttempt}
        />
      )}

      {quizStatus === "result" && selectedQuiz && scoreData && (
        <ResultDashboard
          quiz={selectedQuiz}
          scoreData={scoreData}
          timeTaken={timeTaken}
          onReview={handleReview}
          onRetake={handleRetake}
          onHome={handleGoHome}
        />
      )}

      {quizStatus === "review" && selectedQuiz && (
        <ReviewAnswers
          quiz={selectedQuiz}
          questions={randomizedQuestions}
          userAnswers={userAnswers}
          checkedQuestions={checkedQuestions}
          onBack={handleBackToResult}
          onRetake={handleRetake}
          onHome={handleGoHome}
        />
      )}
    </>
  );
}
