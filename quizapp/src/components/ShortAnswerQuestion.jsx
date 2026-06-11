export default function ShortAnswerQuestion({
  question,
  userAnswer = "",
  onAnswer,
  isChecked,
  isCorrect,
}) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => !isChecked && onAnswer(e.target.value)}
        disabled={isChecked}
        placeholder="Type your answer here..."
        className={`w-full px-4 py-3 rounded-xl border-2 bg-white/5 text-white
          placeholder-slate-600 outline-none transition-all duration-200
          focus:ring-2 focus:ring-indigo-500/50
          ${
            isChecked
              ? isCorrect
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-red-500 bg-red-500/10"
              : "border-white/10 focus:border-indigo-500"
          }
          disabled:cursor-default`}
      />
      {isChecked && !isCorrect && (
        <div className="text-sm animate-scale-in">
          <span className="text-slate-500">Expected answer: </span>
          <span className="text-emerald-400 font-semibold">
            {question.correctAnswer}
          </span>
          {question.acceptedAnswers && question.acceptedAnswers.length > 1 && (
            <span className="text-slate-600 ml-2">
              (also accepted: {question.acceptedAnswers.filter(a => a !== question.correctAnswer).join(", ")})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
