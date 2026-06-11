export default function MCQQuestion({
  question,
  selectedAnswer,
  onAnswer,
  isChecked,
  isCorrect,
}) {
  const getOptionClass = (option) => {
    if (!isChecked) {
      return option === selectedAnswer ? "option-selected" : "option-default";
    }

    // After checking
    if (option === question.correctAnswer) return "option-correct";
    if (option === selectedAnswer && !isCorrect) return "option-wrong";
    return "option-disabled";
  };

  return (
    <div className="space-y-3">
      {question.options.map((option, idx) => (
        <button
          key={idx}
          className={getOptionClass(option)}
          onClick={() => !isChecked && onAnswer(option)}
          disabled={isChecked}
        >
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-slate-400">
              {String.fromCharCode(65 + idx)}
            </span>
            <span>{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
