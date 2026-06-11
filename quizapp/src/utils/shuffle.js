/**
 * Fisher-Yates shuffle algorithm.
 * Returns a new shuffled array without mutating the original.
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Randomize questions and their options.
 * Returns questions with shuffled order, and shuffled options for MCQ/multi-select.
 */
export function randomizeQuiz(questions) {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map((q) => {
    if (q.type === "mcq" || q.type === "multi-select") {
      return { ...q, options: shuffleArray(q.options) };
    }
    return { ...q };
  });
}
