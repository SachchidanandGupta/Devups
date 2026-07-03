
export const LEVEL_TITLES = [
  { min: 1, max: 8, title: "booting_up" },
  { min: 9, max: 16, title: "code_apprentice" },
  { min: 17, max: 24, title: "bug_hunter" },
  { min: 25, max: 32, title: "software_engineer" },
  { min: 33, max: 40, title: "senior_engineer" },
  { min: 41, max: 48, title: "system_programmer" },
  { min: 49, max: 56, title: "tech_lead" },
  { min: 57, max: 64, title: "system_architect" },
  { min: 65, max: 72, title: "elite_architect" },
  { min: 73, max: 80, title: "kernel_maintainer" },
  { min: 81, max: 88, title: "principal_engineer" },
  { min: 89, max: 100, title: "root_admin" },
];

export const getLevelTitle = (level) => {
  const rank = LEVEL_TITLES.find(
    ({ min, max }) => level >= min && level <= max
  );

  return rank?.title.toUpperCase() ?? "unknown";
};