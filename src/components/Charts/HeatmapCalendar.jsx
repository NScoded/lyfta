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
        overflowX: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Workout Consistency
      </Typography>

      <Box
        sx={{
          minWidth: { xs: "700px", md: "100%" },

          "& .react-calendar-heatmap rect": {
            transition: "all 0.2s ease",
          },

          "& .react-calendar-heatmap rect:hover": {
            transform: "scale(1.15)",
          },

          "& .react-calendar-heatmap .color-empty": {
            fill: "#0f172a", // old dark bg
          },

          /* Hide Sundays */
          "& .react-calendar-heatmap rect:nth-of-type(7n+1)": {
            fill: "transparent !important",
            pointerEvents: "none",
          "& .react-calendar-heatmap .color-scale-1": {
            fill: "#22d3ee", // your blue
          },

          "& .react-calendar-heatmap text": {
            fill: "#94a3b8",
            fontSize: "10px",
          },
        }}
      >
        <CalendarHeatmap
          startDate={new Date("2025-01-01")}
          endDate={new Date()}
          values={values}
          classForValue={(value) => {
            if (!value) return "color-empty";
            return "color-scale-1";
          }}
        />
      </Box>
    </Box>
  );
}
