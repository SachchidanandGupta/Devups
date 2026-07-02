import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { GithubSkeleton } from "../../../shared/ui/Skeleton";
const GithubHeatmap = ({ userId }) => {

  const { userHeatMap,heatMap,isLoading } = useUser();

  useEffect(() => {
    if (userId) {
      userHeatMap(userId);
    }
  }, [userId]);

  function getMonthLabels(weeks) {
    const monthLabels = [];
    let lastMonth = null;
    let lastLabelWeek = -3;

    weeks.forEach((week, weekIndex) => {
      if (!week[0]) return;
      const date = new Date(week[0].date);
      const month = date.getMonth();

      if (month !== lastMonth && weekIndex - lastLabelWeek >= 3) {
        monthLabels.push({
          weekIndex,
          label: date.toLocaleDateString("en-US", { month: "short" }),
        });
        lastMonth = month;
        lastLabelWeek = weekIndex;
      } else if (month !== lastMonth) {
        lastMonth = month;
      }
    });

    return monthLabels;
  }

  function buildHeatmapGrid(heatMap) {
    if (!heatMap || heatMap.length === 0) return { weeks: [], monthLabels: [] };

    const dataMap = new Map(heatMap.map((d) => [d.date, d.contributionCount]));

    const firstDate = new Date(heatMap[0].date);
    const startDate = new Date(firstDate);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const lastDate = new Date(heatMap[heatMap.length - 1].date);

    const weeks = [];
    let currentDate = new Date(startDate);
    let weekIndex = 0;

    while (currentDate <= lastDate) {
      if (!weeks[weekIndex]) weeks[weekIndex] = [];

      const dateStr = currentDate.toISOString().split("T")[0];
      const dayIndex = currentDate.getDay();
      const count = dataMap.get(dateStr) || 0;

      weeks[weekIndex][dayIndex] = { date: dateStr, count };

      currentDate.setDate(currentDate.getDate() + 1);
      if (dayIndex === 6) weekIndex++;
    }

    return { weeks, monthLabels: getMonthLabels(weeks) };
  }

  const CELL_SIZE = 11;
  const CELL_GAP = 2;
  const STEP = CELL_SIZE + CELL_GAP;
  const LEFT_PADDING = 4;
  const TOP_PADDING = 20;

  function getColor(count) {
    if (count === 0) return "var(--color-surface-2)";
    if (count <= 3) return "#003319";
    if (count <= 7) return "#006633";
    if (count <= 12) return "#00b359";
    return "#00ff88";
  }

  const { weeks, monthLabels } = buildHeatmapGrid(heatMap);
  return (
    <div>
      {isLoading ? (
        <GithubSkeleton />
      ) : (
        <div className="w-full border border-border p-4 bg-black font-mono flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
            <span className="uppercase text-text-secondary text-sm font-bold tracking-widest truncate block">
              commit_velocity_grid
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-text-muted">LESS</span>
              <div className="w-3 h-3 bg-surface-2 "></div>
              <div
                className="w-3 h-3"
                style={{ backgroundColor: "#003319" }}
              ></div>
              <div
                className="w-3 h-3"
                style={{ backgroundColor: "#006633" }}
              ></div>
              <div
                className="w-3 h-3"
                style={{ backgroundColor: "#00b359" }}
              ></div>
              <div className="w-3 h-3 bg-accent"></div>
              <span className="text-xs text-text-muted">MORE</span>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${LEFT_PADDING + weeks.length * STEP} ${TOP_PADDING + 7 * STEP}`}
              width="100%"
              height="100%"
              className="w-full block"
              preserveAspectRatio="xMinYMin meet"
            >
              {monthLabels.map(({ weekIndex, label }) => (
                <text
                  key={weekIndex}
                  x={LEFT_PADDING + weekIndex * STEP}
                  y={12}
                  fontSize="10"
                  fill="currentColor"
                  className="text-text-muted font-mono"
                >
                  {label}
                </text>
              ))}

              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  if (!day) return null;
                  return (
                    <rect
                      key={`${weekIndex}-${dayIndex}`}
                      x={LEFT_PADDING + weekIndex * STEP}
                      y={TOP_PADDING + dayIndex * STEP}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      fill={getColor(day.count)}
                      className="hover:stroke-accent hover:stroke-[1.5px] cursor-pointer transition-all duration-200"
                    >
                      <title>
                        {day.count} contributions on {day.date}
                      </title>
                    </rect>
                  );
                }),
              )}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubHeatmap;
