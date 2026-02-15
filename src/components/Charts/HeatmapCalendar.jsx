import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Box, Typography } from "@mui/material";

export default function HeatmapCalendar({ workouts }) {
  const values = workouts.map((w) => ({
    date: w.workout_perform_date.split(" ")[0],
    count: 1,
  }));

  return (
    <Box
      sx={{
        background: "#1e293b",
        p: 3,
        borderRadius: 3,
        mb: 6,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Workout Consistency
      </Typography>

      <CalendarHeatmap
        startDate={new Date("2025-01-01")}
        endDate={new Date()}
        values={values}
      />
    </Box>
  );
}
