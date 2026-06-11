export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in-up">
      {/* Animated spinner ring */}
      <div className="relative w-16 h-16 mb-6">
        <div
          className="absolute inset-0 rounded-full border-4 border-white/10"
        />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500/50 animate-spin"
        />
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-violet-500 border-l-violet-500/50 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>

      {/* Pulsing dots */}
      <div className="flex items-center gap-1.5 mb-3">
        <span
          className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>

      <p className="text-slate-400 text-sm font-medium">{message}</p>
    </div>
  );
}
