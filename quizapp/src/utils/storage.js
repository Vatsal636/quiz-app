const STORAGE_KEY = "quiz-app-state";
const BEST_SCORE_PREFIX = "quiz-best-";

/**
 * Save the current quiz attempt state to localStorage.
 */
export function saveAttemptState(state) {
  try {
    const serialized = JSON.stringify({
      quizId: state.quizId,
      randomizedQuestions: state.randomizedQuestions,
      currentQuestionIndex: state.currentQuestionIndex,
      userAnswers: state.userAnswers,
      checkedQuestions: state.checkedQuestions,
      score: state.score,
      timerSeconds: state.timerSeconds,
      quizStatus: state.quizStatus,
      startTime: state.startTime,
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.warn("Failed to save attempt state:", e);
  }
}

/**
 * Load the saved quiz attempt state from localStorage.
 * Returns null if no saved state exists.
 */
export function loadAttemptState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized);
  } catch (e) {
    console.warn("Failed to load attempt state:", e);
    return null;
  }
}

/**
 * Clear the saved quiz attempt state.
 */
export function clearAttemptState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear attempt state:", e);
  }
}

/**
 * Save a best score for a specific quiz.
 */
export function saveBestScore(quizId, scoreData) {
  try {
    const key = BEST_SCORE_PREFIX + quizId;
    const existing = getBestScore(quizId);
    if (!existing || scoreData.percentage > existing.percentage) {
      localStorage.setItem(key, JSON.stringify(scoreData));
    }
  } catch (e) {
    console.warn("Failed to save best score:", e);
  }
}

/**
 * Get the best score for a specific quiz.
 */
export function getBestScore(quizId) {
  try {
    const key = BEST_SCORE_PREFIX + quizId;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.warn("Failed to get best score:", e);
    return null;
  }
}
