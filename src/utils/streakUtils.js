export function calculateStreak(workouts) {
  if (!workouts.length) return 0;

  // Unique workout dates
  const dates = [
    ...new Set(
      workouts.map((w) =>
        w.workout_perform_date.split(" ")[0]
      )
    ),
  ];

  // Sort newest first
  dates.sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;
  let expectedDate = new Date(dates[0]);

  for (let i = 0; i < dates.length; i++) {
    const workoutDate = new Date(dates[i]);

    // If date matches expected date
    if (
      workoutDate.toDateString() ===
      expectedDate.toDateString()
    ) {
      streak++;

      // Move expected date back by 1 day
      expectedDate.setDate(expectedDate.getDate() - 1);

      // Skip Sunday automatically
      if (expectedDate.getDay() === 0) {
        expectedDate.setDate(expectedDate.getDate() - 1);
      }
    } else {
      break;
    }
  }

  return streak;
}
