export default function ProgressBar({ current, total, answeredCount }) {
  const percentage = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>
          {answeredCount}/{total} answered · {percentage}%
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
