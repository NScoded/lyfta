import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

export default function HeatmapCalendar({ workouts }) {
  const values = useMemo(() => {
    return workouts.map((w) => ({
      date: w.workout_perform_date.split(" ")[0],
      count: 1,
    }));
  }, [workouts]);

  return (
    <Box
      sx={{
        background: "linear-gradient(145deg, #1e293b, #0f172a)",
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        mb: 6,
        overflowX: "auto",
        boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: "bold",
          letterSpacing: 1,
        }}
      >
        Workout Consistency
      </Typography>

      <Box
        sx={{
          minWidth: { xs: "700px", md: "100%" },
          "& .react-calendar-heatmap": {
            width: "100%",
          },
          "& .react-calendar-heatmap rect": {
            rx: 6,
            ry: 6,
            transition: "all 0.3s ease",
          },
          "& .react-calendar-heatmap rect:hover": {
            stroke: "#22d3ee",
            strokeWidth: 2,
            transform: "scale(1.2)",
          },
          "& .react-calendar-heatmap .color-empty": {
            fill: "#0f172a",
          },
          "& .react-calendar-heatmap .color-scale-1": {
            fill: "#22d3ee",
          },

          /* Hide Sundays */
          "& .react-calendar-heatmap rect:nth-of-type(7n+1)": {
            fill: "transparent !important",
            pointerEvents: "none",
          },

          /* Remove default text */
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
