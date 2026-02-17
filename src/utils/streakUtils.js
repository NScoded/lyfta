export function calculateStreak(workouts) {
  if (!workouts.length) return 0;

  // Unique workout dates (YYYY-MM-DD)
  const workoutDates = [
    ...new Set(workouts.map((w) => w.workout_perform_date.split(" ")[0])),
  ].sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;
  let currentDate = new Date(workoutDates[0]);

  for (let i = 0; i < workoutDates.length; i++) {
    const workoutDate = new Date(workoutDates[i]);

    // If same day → count it
    if (workoutDate.toDateString() === currentDate.toDateString()) {
      streak++;

      // Move to previous working day
      currentDate.setDate(currentDate.getDate() - 1);

      // Skip Sundays (but do NOT count them)
      while (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() - 1);
      }
    } else {
      break;
    }
  }

  return streak;
}
