export function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-surface-2 rounded-none ${className ?? ""}`}
    />
  );
}

export function LeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
}

export function FriendSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
}

export function ContestSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Top Row: Github Heatmap Skeleton Area */}
      <Skeleton className="h-[180px] w-full" />

      {/* Bottom Row: StatsCard and DailyProblem Area */}
      <div className="grid grid-cols-3 gap-4">
        {/* StatsCard Skeleton (1 Column) */}
        <Skeleton className="col-span-1 h-[300px] w-full" />
        
        {/* DailyProblem Skeleton (2 Columns) */}
        <Skeleton className="col-span-2 h-[300px] w-full" />
      </div>
    </div>
  );
}

export function GithubSkeleton() {
  return (
    <div className="w-full border border-border p-4 bg-black font-mono flex flex-col gap-4 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-surface-2 rounded-full" />
          <div className="h-5 w-48 bg-surface-2 " />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="h-3 w-8 bg-surface-2 " />
          <div className="w-3 h-3 bg-surface-2 opacity-20 " />
          <div className="w-3 h-3 bg-surface-2 opacity-40 " />
          <div className="w-3 h-3 bg-surface-2 opacity-60 " />
          <div className="w-3 h-3 bg-surface-2 opacity-80 " />
          <div className="w-3 h-3 bg-surface-2 " />
          <div className="h-3 w-8 bg-surface-2 " />
        </div>
      </div>

      <div className="w-full h-[120px] sm:h-[150px] bg-surface-2" />
    </div>
  );
}
