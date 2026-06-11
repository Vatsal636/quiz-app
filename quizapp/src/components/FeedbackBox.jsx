export default function FeedbackBox({ isCorrect, explanation }) {
  return (
    <div
      className={`mt-4 p-4 rounded-xl border animate-scale-in ${
        isCorrect
          ? "bg-emerald-500/10 border-emerald-500/30"
          : "bg-red-500/10 border-red-500/30"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span
          className={`font-bold text-sm ${
            isCorrect ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isCorrect ? "Correct!" : "Incorrect"}
        </span>
      </div>
      {explanation && (
        <p className="text-sm text-slate-300 leading-relaxed">{explanation}</p>
      )}
    </div>
  );
}
