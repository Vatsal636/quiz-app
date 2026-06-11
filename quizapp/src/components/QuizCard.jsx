import { getBestScore } from "../utils/storage";

const difficultyBadge = {
  Easy: "badge-easy",
  Medium: "badge-medium",
  Hard: "badge-hard",
};

export default function QuizCard({ quiz, onStart }) {
  const bestScore = getBestScore(quiz.id);

  return (
    <div className="quiz-card animate-fade-in-up" onClick={() => onStart(quiz)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className={difficultyBadge[quiz.difficulty] || "badge"}>
          {quiz.difficulty}
        </span>
        {bestScore && (
          <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            Best: {bestScore.percentage}%
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
      <p className="text-slate-400 text-sm mb-5 leading-relaxed">
        {quiz.description}
      </p>

      {/* Meta Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-white">
            {quiz.totalQuestions ?? quiz.questions?.length ?? 0}
          </div>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">
            Questions
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-white">
            {quiz.durationMinutes}m
          </div>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">
            Duration
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-white">
            {quiz.marksPerQuestion * (quiz.totalQuestions ?? quiz.questions?.length ?? 0)}
          </div>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">
            Max Marks
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Pass: {quiz.passingPercentage}%
        </span>
        {quiz.negativeMarking && (
          <span className="text-amber-500/70">
            −{quiz.negativeMarks} negative
          </span>
        )}
      </div>

      {/* Start Button */}
      <button
        className="btn-primary w-full mt-5 text-center"
        onClick={(e) => {
          e.stopPropagation();
          onStart(quiz);
        }}
      >
        Start Quiz →
      </button>
    </div>
  );
}
