const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Reusable request helper with error handling for network failures,
 * non-2xx responses, and invalid JSON.
 */
async function request(endpoint) {
  if (!BASE_URL) {
    throw new Error(
      "API base URL is not configured. Set VITE_API_BASE_URL in your .env file."
    );
  }

  const url = `${BASE_URL}${endpoint}`;
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "Network error — unable to reach the quiz server. Please check your connection and try again."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Server responded with ${response.status} ${response.statusText}. Please try again later.`
    );
  }

  try {
    return await response.json();
  } catch {
    throw new Error(
      "Received an invalid response from the server. Please try again later."
    );
  }
}

/**
 * Fetch all available quizzes (metadata only, no questions).
 * GET /quizzes
 * @returns {Promise<Array>} List of quiz summaries
 */
export async function fetchQuizzes() {
  return request("/quizzes");
}

/**
 * Fetch a single quiz by ID, including full question data.
 * GET /quizzes/:id
 * @param {string} quizId
 * @returns {Promise<Object>} Complete quiz data with questions
 */
export async function fetchQuizById(quizId) {
  return request(`/quizzes/${encodeURIComponent(quizId)}`);
}
