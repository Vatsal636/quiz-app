import MCQQuestion from "./MCQQuestion";
import MultiSelectQuestion from "./MultiSelectQuestion";
import ShortAnswerQuestion from "./ShortAnswerQuestion";

const typeLabels = {
  mcq: "Multiple Choice",
  "multi-select": "Multi-Select",
  "short-answer": "Short Answer",
};

export default function QuestionRenderer({
  question,
  userAnswer,
  onAnswer,
  isChecked,
  isCorrect,
}) {
  return (
    <div className="animate-slide-in">
      {/* Question type badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-indigo-500/20">
          {typeLabels[question.type] || question.type}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-xl font-bold text-white mb-6 leading-relaxed">
        {question.question}
      </h2>

      {/* Question type-specific renderer */}
      {question.type === "mcq" && (
        <MCQQuestion
          question={question}
          selectedAnswer={userAnswer}
          onAnswer={onAnswer}
          isChecked={isChecked}
          isCorrect={isCorrect}
        />
      )}

      {question.type === "multi-select" && (
        <MultiSelectQuestion
          question={question}
          selectedAnswers={userAnswer}
          onAnswer={onAnswer}
          isChecked={isChecked}
          isCorrect={isCorrect}
        />
      )}

      {question.type === "short-answer" && (
        <ShortAnswerQuestion
          question={question}
          userAnswer={userAnswer}
          onAnswer={onAnswer}
          isChecked={isChecked}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
}
