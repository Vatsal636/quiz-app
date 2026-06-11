import { checkAnswer } from "../utils/scoring";

export default function ReviewAnswers({
  quiz,
  questions,
  userAnswers,
  checkedQuestions,
  onBack,
  onRetake,
  onHome,
}) {
  const { marksPerQuestion, negativeMarking, negativeMarks } = quiz;

  const getResultForQuestion = (q) => {
    const answer = userAnswers[q.id];
    const hasAns = hasAnswer(answer);

    if (!hasAns) {
      return { status: "unanswered", marks: 0, label: "Unanswered", color: "text-slate-400" };
    }

    const isCorrect = checkAnswer(q, answer);
    if (isCorrect) {
      return {
        status: "correct",
        marks: marksPerQuestion,
        label: "Correct",
        color: "text-emerald-400",
      };
    }

    const penalty = negativeMarking ? negativeMarks : 0;
    return {
      status: "wrong",
      marks: -penalty,
      label: "Wrong",
      color: "text-red-400",
    };
  };

  const formatAnswer = (answer) => {
    if (answer === null || answer === undefined) return "—";
    if (Array.isArray(answer)) return answer.length > 0 ? answer.join(", ") : "—";
    if (typeof answer === "string") return answer.trim() || "—";
    return String(answer);
  };

  const getCorrectAnswer = (q) => {
    if (q.type === "mcq") return q.correctAnswer;
    if (q.type === "multi-select") return q.correctAnswers.join(", ");
    if (q.type === "short-answer") return q.correctAnswer;
    return "—";
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-slate-500 hover:text-slate-300 transition-colors"
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
            <h1 className="text-lg font-bold text-white">Answer Review</h1>
          </div>
          <span className="text-sm text-slate-500">{quiz.title}</span>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-4">
        {questions.map((q, idx) => {
          const result = getResultForQuestion(q);
          const answer = userAnswers[q.id];

          return (
            <div
              key={q.id}
              className={`glass-card p-6 animate-fade-in-up border-l-4 ${
                result.status === "correct"
                  ? "border-l-emerald-500"
                  : result.status === "wrong"
                    ? "border-l-red-500"
                    : "border-l-slate-600"
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  Q{idx + 1} · {q.type === "mcq" ? "MCQ" : q.type === "multi-select" ? "Multi-Select" : "Short Answer"}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold ${result.color}`}
                  >
                    {result.label}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      result.marks > 0
                        ? "text-emerald-400"
                        : result.marks < 0
                          ? "text-red-400"
                          : "text-slate-500"
                    }`}
                  >
                    {result.marks > 0 ? "+" : ""}
                    {result.marks} marks
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-white font-semibold mb-4 leading-relaxed">
                {q.question}
              </h3>

              {/* Answer Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                    Your Answer
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      result.status === "correct"
                        ? "text-emerald-400"
                        : result.status === "wrong"
                          ? "text-red-400"
                          : "text-slate-500 italic"
                    }`}
                  >
                    {formatAnswer(answer)}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                    Correct Answer
                  </div>
                  <div className="text-sm font-medium text-emerald-400">
                    {getCorrectAnswer(q)}
                  </div>
                </div>
              </div>

              {/* Explanation */}
              {q.explanation && (
                <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-xl p-4">
                  <div className="text-[11px] text-indigo-400 uppercase tracking-wider font-semibold mb-1">
                    Explanation
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onBack} className="btn-primary flex-1 text-center">
            ← Back to Results
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

function hasAnswer(answer) {
  if (answer === null || answer === undefined) return false;
  if (typeof answer === "string") return answer.trim().length > 0;
  if (Array.isArray(answer)) return answer.length > 0;
  return false;
}
