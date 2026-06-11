/**
 * Check if a single MCQ answer is correct.
 */
export function checkMCQ(userAnswer, correctAnswer) {
  return userAnswer === correctAnswer;
}

/**
 * Check if multi-select answers are correct.
 * Both arrays must contain the same elements, regardless of order.
 */
export function checkMultiSelect(userAnswers, correctAnswers) {
  if (!Array.isArray(userAnswers) || !Array.isArray(correctAnswers)) return false;
  if (userAnswers.length !== correctAnswers.length) return false;
  const sortedUser = [...userAnswers].sort();
  const sortedCorrect = [...correctAnswers].sort();
  return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
}

/**
 * Check if a short answer is correct.
 * Trims and lowercases the user input, then compares against accepted answers.
 */
export function checkShortAnswer(userAnswer, acceptedAnswers) {
  if (!userAnswer || !Array.isArray(acceptedAnswers)) return false;
  const normalized = userAnswer.trim().toLowerCase();
  return acceptedAnswers.some((a) => a.trim().toLowerCase() === normalized);
}

/**
 * Check a single question's answer and return whether it's correct.
 */
export function checkAnswer(question, userAnswer) {
  switch (question.type) {
    case "mcq":
      return checkMCQ(userAnswer, question.correctAnswer);
    case "multi-select":
      return checkMultiSelect(userAnswer, question.correctAnswers);
    case "short-answer":
      return checkShortAnswer(userAnswer, question.acceptedAnswers);
    default:
      return false;
  }
}

/**
 * Calculate the final score for a completed quiz.
 */
export function calculateScore(quiz, questions, userAnswers, checkedQuestions) {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  let totalMarks = 0;
  let obtainedMarks = 0;

  const { marksPerQuestion, negativeMarking, negativeMarks } = quiz;

  questions.forEach((q) => {
    totalMarks += marksPerQuestion;
    const answer = userAnswers[q.id];
    const isChecked = checkedQuestions[q.id];

    if (!isChecked && !hasAnswer(answer)) {
      unanswered++;
      return;
    }

    const isCorrect = checkAnswer(q, answer);
    if (isCorrect) {
      correct++;
      obtainedMarks += marksPerQuestion;
    } else if (hasAnswer(answer)) {
      wrong++;
      if (negativeMarking) {
        obtainedMarks -= negativeMarks;
      }
    } else {
      unanswered++;
    }
  });

  // Ensure obtained marks don't go below 0
  obtainedMarks = Math.max(0, obtainedMarks);

  const percentage = totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 0;
  const passed = percentage >= quiz.passingPercentage;

  let performanceLabel;
  if (percentage >= 80) performanceLabel = "Excellent";
  else if (percentage >= 60) performanceLabel = "Good";
  else if (percentage >= quiz.passingPercentage) performanceLabel = "Fair";
  else performanceLabel = "Needs Improvement";

  return {
    correct,
    wrong,
    unanswered,
    totalQuestions: questions.length,
    totalMarks,
    obtainedMarks: parseFloat(obtainedMarks.toFixed(2)),
    percentage,
    passed,
    performanceLabel,
  };
}

/**
 * Check if a user has provided any answer for a question.
 */
function hasAnswer(answer) {
  if (answer === null || answer === undefined) return false;
  if (typeof answer === "string") return answer.trim().length > 0;
  if (Array.isArray(answer)) return answer.length > 0;
  return false;
}
