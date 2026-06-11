import { quizzes } from "../data/quizzes";
import QuizCard from "./QuizCard";

export default function QuizSelection({ onStartQuiz }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center pt-16 pb-12 px-4">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
            Ready to Learn
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          Quiz<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Hub</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Challenge yourself with interactive quizzes. Get instant feedback,
          track your progress, and master new concepts.
        </p>
      </div>

      {/* Quiz Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />
          ))}
        </div>
      </div>
    </div>
  );
}
