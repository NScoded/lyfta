export function calculateStreak(workouts = []) {
  if (!Array.isArray(workouts) || workouts.length === 0) {
    return 0;
  }

  /*
    Store workout dates.

    Sunday is NOT stored because Sunday is
    the gym's fixed rest day.
  */

  const workoutDates = new Set();

  workouts.forEach((workout) => {
    if (!workout?.workout_perform_date) {
      return;
    }

    const dateKey = String(
      workout.workout_perform_date
    ).split(" ")[0];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
      return;
    }

    const [year, month, day] = dateKey
      .split("-")
      .map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    /*
      Sunday = 0

      Sunday is a fixed gym rest day,
      so it must never be counted as a
      required workout day.
    */

    if (date.getDay() === 0) {
      return;
    }

    workoutDates.add(dateKey);
  });

  if (workoutDates.size === 0) {
    return 0;
  }

  /* ============================================================
     DATE HELPERS
  ============================================================ */

  const formatDate = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* ============================================================
     CURRENT STREAK

     Rules:

     Monday -> Saturday
       Workout required.

     Sunday
       Gym closed.
       Does NOT break the streak.

     Saturday -> Monday
       Counts as consecutive streak days.
  ============================================================ */

  const today = new Date();

  let currentDate = new Date(today);

  /*
    If today is Sunday:

    Sunday is a rest day, so start checking
    from Saturday.
  */

  if (currentDate.getDay() === 0) {
    currentDate.setDate(
      currentDate.getDate() - 1
    );
  } else {
    /*
      Today is Monday-Saturday.

      If today's workout is missing,
      current streak is already broken.
    */

    const todayKey = formatDate(
      currentDate
    );

    if (!workoutDates.has(todayKey)) {
      return 0;
    }
  }

  let streak = 0;

  while (true) {
    /*
      Sunday is ignored completely.

      It cannot break the streak.
    */

    if (currentDate.getDay() === 0) {
      currentDate.setDate(
        currentDate.getDate() - 1
      );

      continue;
    }

    const dateKey = formatDate(
      currentDate
    );

    /*
      No workout on a required gym day
      means the streak ends.
    */

    if (!workoutDates.has(dateKey)) {
      break;
    }

    streak++;

    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  return streak;
}