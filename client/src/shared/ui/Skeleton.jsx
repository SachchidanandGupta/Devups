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
    <div className="p-4 flex flex-col gap-4 w-full font-mono">
      
      <div className="lg:col-span-3 overflow-hidden bg-black border border-border">
        <GithubSkeleton />
      </div>

      <div className="grid grid-cols-3 gap-4">
        
        <div className="col-span-1">
          <StatsCardSkeleton />
        </div>
        
        <div className="col-span-2">
          <DailyProblemSkeleton />
        </div>
        
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

export function ProfileSkeleton() {
  return (
    <div className="w-full p-4 gap-4 flex flex-col font-mono animate-pulse">
      <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4">
        <div className="relative lg:col-span-2 flex flex-col justify-end border border-border bg-black min-h-[250px]">
          <div className="absolute right-0 top-0 border-l border-b border-border p-2">
            <div className="w-32 h-3 bg-surface-2"></div>
          </div>

          <div className="p-4 sm:p-8 flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 mt-8 sm:mt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 min-w-0 w-full">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-surface-2 border border-border shrink-0"></div>

              <div className="flex flex-col items-center sm:items-start gap-3 min-w-0 w-full">
                <div className="w-48 sm:w-64 h-10 sm:h-14 bg-surface-2"></div>

                <div className="flex gap-2 items-center w-full justify-center sm:justify-start">
                  <div className="w-24 h-6 bg-surface-2"></div>
                  <div className="w-16 h-6 bg-surface-2"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end items-center sm:items-end shrink-0 w-full sm:w-auto">
              <div className="w-full sm:w-32 h-8 sm:h-10 bg-surface-2"></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col font-mono border border-border bg-black">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex p-3 justify-between items-center border-b border-border"
            >
              <div className="w-16 h-3 bg-surface-2"></div>
              <div className="w-24 h-3 bg-surface-2"></div>
            </div>
          ))}
          <div className="flex items-center gap-2 p-4">
            <div className="w-2.5 h-2.5 bg-surface-2"></div>
            <div className="w-32 h-3 bg-surface-2"></div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border border-border p-4 sm:p-6 flex flex-col gap-4 bg-black">
          <div className="flex justify-between items-center">
            <div className="w-40 h-5 bg-surface-2"></div>
            <div className="w-32 h-3 bg-surface-2 hidden sm:block"></div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-surface-2 border border-border"
              ></div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 border border-border flex flex-col items-center justify-center p-6 gap-6 bg-black">
          <div className="w-32 h-4 bg-surface-2"></div>
          <div className="w-40 h-16 bg-surface-2"></div>
          <div className="w-48 h-3 bg-surface-2 mt-2"></div>
          <div className="w-full h-4 bg-surface-2 border border-border mt-2"></div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-black border border-border p-4 flex flex-col gap-4">
          <div className="w-48 h-5 bg-surface-2"></div>
          <div className="w-full h-[180px] bg-surface-2/50 border border-border"></div>
        </div>

        <div className="lg:col-span-1 border border-border bg-black flex flex-col min-h-[200px]">
          <div className="p-3 border-b border-border flex justify-between items-center">
            <div className="w-32 h-4 bg-surface-2"></div>
            <div className="w-4 h-4 bg-surface-2"></div>
          </div>

          <div className="flex flex-col">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-3 border-b border-border flex gap-4 items-center"
              >
                <div className="w-10 h-10 bg-surface-2 shrink-0"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-24 h-3 bg-surface-2"></div>
                  <div className="w-12 h-2 bg-surface-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="border border-border p-4 sm:p-6 flex flex-col gap-4 bg-black min-h-[250px]">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div className="w-64 h-6 bg-surface-2"></div>
            <div className="w-24 h-3 bg-surface-2"></div>
          </div>

          <div className="w-full flex flex-col mt-2">
            <div className="w-full grid grid-cols-5 gap-4 py-2 border-b border-border">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 bg-surface-2 w-full max-w-[80px]"
                ></div>
              ))}
            </div>

            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full grid grid-cols-5 gap-4 py-4 border-b border-border"
              >
                <div className="h-4 bg-surface-2 w-full max-w-[120px]"></div>
                <div className="h-4 bg-surface-2 w-full max-w-[60px]"></div>
                <div className="h-4 bg-surface-2 w-full max-w-[80px]"></div>
                <div className="h-4 bg-surface-2 w-full max-w-[50px]"></div>
                <div className="h-6 bg-surface-2 w-full max-w-[100px]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function XPbarSkeleton() {
  return (
    <div className="w-full flex flex-col font-mono gap-2 p-4 border border-border bg-black animate-pulse">
      <div className="flex items-end justify-between gap-4 min-w-0">
        <div className="w-48 sm:w-64 h-5 sm:h-6 bg-surface-2 flex-1 block"></div>
        <div className="w-20 sm:w-24 h-4 bg-surface-2 shrink-0 mb-0.5"></div>
      </div>
      <div className="w-full h-2 sm:h-2.5 bg-surface-2 border border-border overflow-hidden">
      </div>
      <div className="w-32 sm:w-40 h-3 bg-surface-2 mt-0.5"></div>
    </div>
  );
}

export function DailyProblemSkeleton() {
  return (
    <div className="border border-border h-full flex flex-col animate-pulse bg-black font-mono">
      <div className="p-2 flex justify-between items-center border-b border-border bg-surface-2 h-[38px]">
        <div className="w-56 h-4 bg-border/50"></div>
        <div className="w-32 h-4 bg-border/50"></div>
      </div>

      <div className="p-4 flex flex-col gap-4 w-full h-full">
        <div className="flex flex-col flex-start gap-4 pb-4 border-b-2 border-border flex-grow">
          <div className="border border-border bg-surface-2 px-4 py-2 w-1/2 h-[38px]"></div>

          <div className="w-3/4 h-7 bg-surface-2 mt-2"></div>

          <div className="flex flex-col gap-2 mt-2">
            <div className="w-full h-4 bg-surface-2"></div>
            <div className="w-5/6 h-4 bg-surface-2"></div>
            <div className="w-2/3 h-4 bg-surface-2"></div>
          </div>

          <div className="w-1/2 flex gap-5 items-center mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col flex-start gap-1">
                <div className="w-20 h-3 bg-surface-2"></div>
                <div className="w-12 h-5 bg-surface-2 mt-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-end pt-2">
          <div className="w-64 h-16 bg-surface-2 border-2 border-border"></div>
        </div>
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="flex flex-col h-full w-full gap-4 font-mono animate-pulse">
      <XPbarSkeleton />

      <div className="flex flex-col w-full h-full bg-black">
        <div className="bg-surface-2 flex justify-between items-center px-4 py-2 w-full border border-border h-[38px]">
          <div className="w-48 h-4 bg-border/50"></div>
          <div className="w-10 h-4 bg-border/50"></div>
        </div>

        <div className="w-full p-4 border border-t-0 border-border flex flex-col gap-5 h-full">
          <div className="pb-2 border-b border-border">
            <div className="w-56 h-3 bg-surface-2"></div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-surface-2"></div>
                  <div className="w-16 h-4 bg-surface-2"></div>
                </div>
                <div className="w-8 h-6 bg-surface-2"></div>
              </div>
            ))}
          </div>

          <div className="mt-2 w-full h-24 bg-surface-2 border border-border"></div>
        </div>
      </div>
    </div>
  );
}
