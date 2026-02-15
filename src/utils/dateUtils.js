export function formatSmartDate(dateString) {
  if (!dateString) return { label: "", day: "", time: "" };

  const utcDate = new Date(dateString.replace(" ", "T") + "Z");

  const localDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const now = new Date();

  const todayStr = now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  const workoutStr = localDate.toDateString();

  const dayName = localDate.toLocaleString("default", {
    weekday: "long",
  });

  const day = localDate.getDate().toString().padStart(2, "0");
  const month = localDate.toLocaleString("default", { month: "short" });
  const year = localDate.getFullYear();

  const time = localDate.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  if (workoutStr === todayStr) {
    return { label: "Today", day: dayName, time };
  }

  if (workoutStr === yesterdayStr) {
    return { label: "Yesterday", day: dayName, time };
  }

  return {
    label: `${day} ${month} ${year}`,
    day: dayName,
    time,
  };
}
