export default function QuestionNavigator({
  questions,
  currentIndex,
  userAnswers,
  checkedQuestions,
  onNavigate,
}) {
  const getButtonClass = (q, idx) => {
    if (idx === currentIndex) return "nav-dot-current";

    const isChecked = checkedQuestions[q.id];
    if (isChecked) {
      return isChecked === "correct" ? "nav-dot-correct" : "nav-dot-wrong";
    }

    const answer = userAnswers[q.id];
    const hasAnswer =
      answer !== undefined &&
      answer !== null &&
      (typeof answer === "string" ? answer.trim().length > 0 : true) &&
      (Array.isArray(answer) ? answer.length > 0 : true);

    return hasAnswer ? "nav-dot-answered" : "nav-dot-unanswered";
  };

  return (
    <div className="glass-card p-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Questions
      </h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={q.id}
            className={getButtonClass(q, idx)}
            onClick={() => onNavigate(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
