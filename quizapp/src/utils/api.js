/**
 * Simulated API layer.
 * Wraps local quiz data with artificial delay to mimic hosted API fetching.
 * Replace these functions with real fetch() calls when a backend is available.
 */

import { quizzes } from "../data/quizzes";

const API_DELAY_MS = 700;

/**
 * Simulate a network delay.
 */
function delay(ms = API_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulate a random API failure (for testing error UI).
 * Set SIMULATE_ERROR to true to force errors during development.
 */
const SIMULATE_ERROR = false;
const ERROR_RATE = 0; // 0 = never fail, 0.3 = 30% failure rate

function maybeThrow() {
  if (SIMULATE_ERROR || Math.random() < ERROR_RATE) {
    throw new Error("Failed to fetch quizzes. Please check your connection and try again.");
  }
}

/**
 * Fetch all available quizzes.
 * Returns quiz metadata (without full question data) for the selection screen.
 * @returns {Promise<Array>} List of quiz summaries
 */
export async function fetchQuizzes() {
  await delay();
  maybeThrow();

  // Return quiz summaries (strip question details for listing)
  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    difficulty: quiz.difficulty,
    durationMinutes: quiz.durationMinutes,
    passingPercentage: quiz.passingPercentage,
    marksPerQuestion: quiz.marksPerQuestion,
    negativeMarking: quiz.negativeMarking,
    negativeMarks: quiz.negativeMarks,
    totalQuestions: quiz.questions.length,
  }));
}

/**
 * Fetch a single quiz by ID, including full question data.
 * @param {string} quizId - The quiz ID to fetch
 * @returns {Promise<Object>} Complete quiz data with questions
 */
export async function fetchQuizById(quizId) {
  await delay();
  maybeThrow();

  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) {
    throw new Error(`Quiz not found: "${quizId}"`);
  }

  // Return a deep copy to prevent mutation of the source data
  return JSON.parse(JSON.stringify(quiz));
}
