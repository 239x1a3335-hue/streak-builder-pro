// Streak Logic for CodeChef Lite
// Manages daily coding streak tracking

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
}

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Parse date string to Date object
const parseDate = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

// Calculate difference in days between two dates
const daysDifference = (date1: string, date2: string): number => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

// Update streak based on last active date
export const calculateUpdatedStreak = (
  currentStreak: number,
  bestStreak: number,
  lastActiveDate: string
): StreakData => {
  const today = getTodayDate();

  // If already active today, no change needed
  if (lastActiveDate === today) {
    return {
      currentStreak,
      bestStreak,
      lastActiveDate,
    };
  }

  const daysDiff = daysDifference(lastActiveDate, today);

  // Consecutive day - increment streak
  if (daysDiff === 1) {
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      bestStreak: Math.max(bestStreak, newStreak),
      lastActiveDate: today,
    };
  }

  // Same day - no change (redundant check but explicit)
  if (daysDiff === 0) {
    return {
      currentStreak,
      bestStreak,
      lastActiveDate,
    };
  }

  // Streak broken - reset to 1
  return {
    currentStreak: 1,
    bestStreak: Math.max(bestStreak, 1),
    lastActiveDate: today,
  };
};

// Check if streak is currently active (solved today)
export const isStreakActive = (lastActiveDate: string): boolean => {
  return lastActiveDate === getTodayDate();
};

// Check if streak is at risk (last active yesterday, not yet today)
export const isStreakAtRisk = (lastActiveDate: string): boolean => {
  const today = getTodayDate();
  const daysDiff = daysDifference(lastActiveDate, today);
  return daysDiff === 1;
};

// Get streak status for UI display
export type StreakStatus = "active" | "at-risk" | "broken";

export const getStreakStatus = (lastActiveDate: string): StreakStatus => {
  const today = getTodayDate();
  
  if (lastActiveDate === today) {
    return "active";
  }
  
  const daysDiff = daysDifference(lastActiveDate, today);
  
  if (daysDiff === 1) {
    return "at-risk";
  }
  
  return "broken";
};

// Format streak for display
export const formatStreakDisplay = (streak: number): string => {
  if (streak === 1) return "1 day";
  return `${streak} days`;
};
