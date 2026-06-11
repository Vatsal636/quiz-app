import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import QuestionNavigator from "./QuestionNavigator";
import QuestionRenderer from "./QuestionRenderer";
import FeedbackBox from "./FeedbackBox";
import { checkAnswer } from "../utils/scoring";
import { saveAttemptState } from "../utils/storage";

export default function QuizAttempt({
  quiz,
  questions,
  initialState,
  onSubmit,
  onQuit,
}) {
  const [currentIndex, setCurrentIndex] = useState(
    initialState?.currentQuestionIndex ?? 0
  );
  const [userAnswers, setUserAnswers] = useState(
    initialState?.userAnswers ?? {}
  );
  const [checkedQuestions, setCheckedQuestions] = useState(
    initialState?.checkedQuestions ?? {}
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const startTimeRef = useRef(initialState?.startTime ?? Date.now());
  const timerSecondsRef = useRef(
    initialState?.timerSeconds ?? quiz.durationMinutes * 60
  );

  const currentQuestion = questions[currentIndex];

  // Count answered questions
  const answeredCount = Object.keys(userAnswers).filter((key) => {
    const val = userAnswers[key];
    if (typeof val === "string") return val.trim().length > 0;
    if (Array.isArray(val)) return val.length > 0;
    return val !== null && val !== undefined;
  }).length;

  // Save state to localStorage on changes
  useEffect(() => {
    saveAttemptState({
      quizId: quiz.id,
      randomizedQuestions: questions,
      currentQuestionIndex: currentIndex,
      userAnswers,
      checkedQuestions,
      score: 0,
      timerSeconds: timerSecondsRef.current,
      quizStatus: "attempt",
      startTime: startTimeRef.current,
    });
  }, [currentIndex, userAnswers, checkedQuestions, quiz.id, questions]);

  const handleAnswer = useCallback(
    (answer) => {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answer,
      }));
    },
    [currentQuestion.id]
  );

  const handleCheckAnswer = useCallback(() => {
    if (checkedQuestions[currentQuestion.id]) return;

    const answer = userAnswers[currentQuestion.id];
    const isCorrect = checkAnswer(currentQuestion, answer);

    setCheckedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: isCorrect ? "correct" : "wrong",
    }));

    // Fire confetti on correct answer
    if (isCorrect) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#6366f1", "#8b5cf6", "#a78bfa", "#34d399", "#fbbf24"],
      });
    }
  }, [currentQuestion, userAnswers, checkedQuestions]);

  const handleTimeUp = useCallback(() => {
    const elapsed = Math.floor(
      (Date.now() - startTimeRef.current) / 1000
    );
    onSubmit(userAnswers, checkedQuestions, elapsed);
  }, [userAnswers, checkedQuestions, onSubmit]);

  const handleSubmit = () => {
    const elapsed = Math.floor(
      (Date.now() - startTimeRef.current) / 1000
    );
    onSubmit(userAnswers, checkedQuestions, elapsed);
    setShowConfirm(false);
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Check if current question has an answer
  const currentAnswer = userAnswers[currentQuestion.id];
  const hasCurrentAnswer =
    currentAnswer !== undefined &&
    currentAnswer !== null &&
    (typeof currentAnswer === "string"
      ? currentAnswer.trim().length > 0
      : true) &&
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

  const isCurrentChecked = !!checkedQuestions[currentQuestion.id];
  const isCurrentCorrect = checkedQuestions[currentQuestion.id] === "correct";

  return (
    <div className="min-h-screen pb-8">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onQuit}
                className="text-slate-500 hover:text-slate-300 transition-colors"
                title="Back to quiz selection"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h2 className="text-sm font-semibold text-slate-300 truncate">
                {quiz.title}
              </h2>
            </div>
            <Timer
              initialSeconds={timerSecondsRef.current}
              onTimeUp={handleTimeUp}
              isPaused={false}
            />
          </div>
          <ProgressBar
            current={currentIndex}
            total={questions.length}
            answeredCount={answeredCount}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6">
          {/* Main Question Area */}
          <div className="space-y-6">
            {/* Question Card */}
            <div className="glass-card p-6 md:p-8" key={currentQuestion.id}>
              <QuestionRenderer
                question={currentQuestion}
                userAnswer={userAnswers[currentQuestion.id]}
                onAnswer={handleAnswer}
                isChecked={isCurrentChecked}
                isCorrect={isCurrentCorrect}
              />

              {/* Feedback */}
              {isCurrentChecked && (
                <FeedbackBox
                  isCorrect={isCurrentCorrect}
                  explanation={currentQuestion.explanation}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="btn-secondary flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-3">
                {!isCurrentChecked && (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!hasCurrentAnswer}
                    className="btn-primary"
                  >
                    Check Answer
                  </button>
                )}

                <button
                  onClick={() => setShowConfirm(true)}
                  className="btn-danger"
                >
                  Submit Quiz
                </button>
              </div>

              <button
                onClick={goNext}
                disabled={currentIndex === questions.length - 1}
                className="btn-secondary flex items-center gap-2"
              >
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Side Navigator (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <QuestionNavigator
                questions={questions}
                currentIndex={currentIndex}
                userAnswers={userAnswers}
                checkedQuestions={checkedQuestions}
                onNavigate={setCurrentIndex}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigator */}
        <div className="lg:hidden mt-6">
          <QuestionNavigator
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            checkedQuestions={checkedQuestions}
            onNavigate={setCurrentIndex}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card p-8 max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-bold text-white mb-2">
              Submit Quiz?
            </h3>
            <p className="text-slate-400 mb-2">
              You have answered{" "}
              <span className="text-white font-semibold">{answeredCount}</span>{" "}
              out of{" "}
              <span className="text-white font-semibold">
                {questions.length}
              </span>{" "}
              questions.
            </p>
            {answeredCount < questions.length && (
              <p className="text-amber-400 text-sm mb-4">
                ⚠ You have {questions.length - answeredCount} unanswered
                question{questions.length - answeredCount !== 1 ? "s" : ""}.
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary flex-1"
              >
                Continue Quiz
              </button>
              <button onClick={handleSubmit} className="btn-danger flex-1">
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
