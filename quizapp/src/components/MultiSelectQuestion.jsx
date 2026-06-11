export default function MultiSelectQuestion({
  question,
  selectedAnswers = [],
  onAnswer,
  isChecked,
  isCorrect,
}) {
  const handleToggle = (option) => {
    if (isChecked) return;
    const newAnswers = selectedAnswers.includes(option)
      ? selectedAnswers.filter((a) => a !== option)
      : [...selectedAnswers, option];
    onAnswer(newAnswers);
  };

  const getOptionClass = (option) => {
    const isSelected = selectedAnswers.includes(option);
    const isCorrectOption = question.correctAnswers.includes(option);

    if (!isChecked) {
      return isSelected ? "option-selected" : "option-default";
    }

    // After checking
    if (isCorrectOption) return "option-correct";
    if (isSelected && !isCorrectOption) return "option-wrong";
    return "option-disabled";
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 mb-1">Select all that apply</p>
      {question.options.map((option, idx) => {
        const isSelected = selectedAnswers.includes(option);
        return (
          <button
            key={idx}
            className={getOptionClass(option)}
            onClick={() => handleToggle(option)}
            disabled={isChecked}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-white/20 bg-transparent"
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              <span>{option}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
