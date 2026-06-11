import { useState, useCallback, useEffect } from "react";
import { fetchQuizById } from "./utils/api";
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
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorDisplay from "./components/ErrorDisplay";

export default function App() {
  const [quizStatus, setQuizStatus] = useState("selection"); // selection | loading | attempt | result | review
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [scoreData, setScoreData] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [initialState, setInitialState] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [pendingQuizSummary, setPendingQuizSummary] = useState(null);

  // On mount: restore saved attempt from localStorage
  useEffect(() => {
    const restoreAttempt = async () => {
      const saved = loadAttemptState();
      if (!saved || saved.quizStatus !== "attempt") return;

      try {
        // Fetch full quiz data via simulated API
        setQuizStatus("loading");
        const quiz = await fetchQuizById(saved.quizId);

        setSelectedQuiz(quiz);
        setRandomizedQuestions(saved.randomizedQuestions);
        setUserAnswers(saved.userAnswers || {});
        setCheckedQuestions(saved.checkedQuestions || {});

        // Calculate remaining time
        const totalDuration = quiz.durationMinutes * 60;
        const elapsed = Math.floor((Date.now() - saved.startTime) / 1000);
        const remaining = Math.max(0, totalDuration - elapsed);

        if (remaining <= 0) {
          // Time already expired while away — auto-submit
          const answers = saved.userAnswers || {};
          const checked = saved.checkedQuestions || {};
          const score = calculateScore(quiz, saved.randomizedQuestions, answers, checked);
          setScoreData(score);
          setTimeTaken(totalDuration);
          saveBestScore(quiz.id, score);
          clearAttemptState();
          setQuizStatus("result");
          return;
        }

        setInitialState({
          ...saved,
          timerSeconds: remaining,
        });
        setQuizStatus("attempt");
      } catch {
        // If restore fails, go back to selection
        clearAttemptState();
        setQuizStatus("selection");
      }
    };

    restoreAttempt();
  }, []);

  const handleStartQuiz = useCallback(async (quizSummary) => {
    setQuizStatus("loading");
    setLoadError(null);
    setPendingQuizSummary(quizSummary);

    try {
      // Fetch full quiz data (with questions) via simulated API
      const fullQuiz = await fetchQuizById(quizSummary.id);
      const questions = randomizeQuiz(fullQuiz.questions);

      setSelectedQuiz(fullQuiz);
      setRandomizedQuestions(questions);
      setUserAnswers({});
      setCheckedQuestions({});
      setScoreData(null);
      setTimeTaken(0);
      setInitialState({
        currentQuestionIndex: 0,
        userAnswers: {},
        checkedQuestions: {},
        timerSeconds: fullQuiz.durationMinutes * 60,
        startTime: Date.now(),
      });

      // Save initial state
      saveAttemptState({
        quizId: fullQuiz.id,
        randomizedQuestions: questions,
        currentQuestionIndex: 0,
        userAnswers: {},
        checkedQuestions: {},
        score: 0,
        timerSeconds: fullQuiz.durationMinutes * 60,
        quizStatus: "attempt",
        startTime: Date.now(),
      });

      setQuizStatus("attempt");
      setPendingQuizSummary(null);
    } catch (err) {
      setLoadError(err.message || "Failed to load quiz data.");
    }
  }, []);

  const handleRetryLoad = useCallback(() => {
    if (pendingQuizSummary) {
      handleStartQuiz(pendingQuizSummary);
    }
  }, [pendingQuizSummary, handleStartQuiz]);

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
      // Re-fetch and re-randomize via handleStartQuiz
      handleStartQuiz({ id: selectedQuiz.id });
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
    setLoadError(null);
    setPendingQuizSummary(null);
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

      {quizStatus === "loading" && !loadError && (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner message="Loading quiz..." />
        </div>
      )}

      {quizStatus === "loading" && loadError && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full px-4">
            <ErrorDisplay message={loadError} onRetry={handleRetryLoad} />
            <div className="text-center mt-4">
              <button onClick={handleGoHome} className="btn-secondary">
                ← Back to Quizzes
              </button>
            </div>
          </div>
        </div>
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
