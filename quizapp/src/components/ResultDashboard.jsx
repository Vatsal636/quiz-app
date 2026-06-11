import confetti from "canvas-confetti";
import { useEffect } from "react";
import { getBestScore } from "../utils/storage";

export default function ResultDashboard({
  quiz,
  scoreData,
  timeTaken,
  onReview,
  onRetake,
  onHome,
}) {
  const { correct, wrong, unanswered, totalQuestions, totalMarks, obtainedMarks, percentage, passed, performanceLabel } = scoreData;

  const bestScore = getBestScore(quiz.id);

  // Fire celebration confetti if passed
  useEffect(() => {
    if (passed) {
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#6366f1", "#8b5cf6", "#34d399"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#6366f1", "#8b5cf6", "#34d399"],
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [passed]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const performanceEmoji = {
    Excellent: "🏆",
    Good: "👍",
    Fair: "👌",
    "Needs Improvement": "📚",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-fade-in-up">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">
            {performanceEmoji[performanceLabel] || "📋"}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {passed ? "Congratulations!" : "Quiz Complete"}
          </h1>
          <p className="text-slate-400">{quiz.title}</p>
        </div>

        {/* Score Ring */}
        <div className="glass-card p-8 mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-36 h-36 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke={passed ? "#34d399" : "#ef4444"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 327} 327`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-white">
                  {percentage}%
                </span>
                <span
                  className={`text-xs font-bold uppercase ${
                    passed ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {passed ? "Passed" : "Failed"}
                </span>
              </div>
            </div>

            <div
              className={`badge ${
                passed
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                  : "bg-red-500/15 text-red-400 border border-red-500/25"
              } text-sm px-4 py-1.5`}
            >
              {performanceLabel}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="stat-card">
              <div className="text-2xl font-bold text-white">
                {obtainedMarks}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                of {totalMarks} marks
              </div>
            </div>
            <div className="stat-card">
              <div className="text-2xl font-bold text-emerald-400">
                {correct}
              </div>
              <div className="text-xs text-slate-500 mt-1">Correct</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl font-bold text-red-400">{wrong}</div>
              <div className="text-xs text-slate-500 mt-1">Wrong</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl font-bold text-slate-400">
                {unanswered}
              </div>
              <div className="text-xs text-slate-500 mt-1">Unanswered</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-xs text-slate-500 mb-1">Time Taken</div>
              <div className="text-lg font-bold text-white">
                {formatTime(timeTaken)}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-xs text-slate-500 mb-1">Total Questions</div>
              <div className="text-lg font-bold text-white">
                {totalQuestions}
              </div>
            </div>
          </div>

          {/* Best Score */}
          {bestScore && (
            <div className="mt-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
              <span className="text-xs text-indigo-400">
                🏅 Your Best Score: {bestScore.percentage}% ({bestScore.obtainedMarks}/{bestScore.totalMarks} marks)
              </span>
            </div>
          )}

          {quiz.negativeMarking && (
            <div className="mt-4 text-xs text-center text-slate-600">
              Negative marking: −{quiz.negativeMarks} per wrong answer
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onReview} className="btn-primary flex-1 text-center">
            📝 Review Answers
          </button>
          <button onClick={onRetake} className="btn-secondary flex-1 text-center">
            🔄 Retake Quiz
          </button>
          <button onClick={onHome} className="btn-secondary flex-1 text-center">
            🏠 All Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}
