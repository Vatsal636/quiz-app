import { quizzes } from '../data/quizzes.js';

// @desc    Get all quizzes (metadata only)
// @route   GET /api/quizzes
export const getQuizzes = (req, res, next) => {
  try {
    const quizMetadata = quizzes.map((quiz) => {
      const { questions, ...metadata } = quiz;
      return {
        ...metadata,
        totalQuestions: questions.length,
      };
    });

    res.status(200).json({
      success: true,
      data: quizMetadata,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quiz by ID with all questions
// @route   GET /api/quizzes/:id
export const getQuizById = (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = quizzes.find((q) => q.id === id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};
