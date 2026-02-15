import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";

import { formatSmartDate } from "../utils/dateUtils";

export default function WorkoutCard({ workout }) {
  const formatted = formatSmartDate(workout.workout_perform_date);

  return (
    <Card
      sx={{
        mb: 4,
        background: "#1e293b",
        color: "white",
        borderRadius: 3,
      }}
    >
      <CardContent>

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Side */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {workout.title}
            </Typography>

            <Typography sx={{ opacity: 0.7 }}>
              Volume: {workout.total_volume} kg
            </Typography>
          </Box>

          {/* Right Side Date */}
          <Box sx={{ textAlign: "right" }}>
  <Typography fontWeight="bold">
    {formatted.label}
  </Typography>

  <Typography
    variant="body2"
    sx={{ opacity: 0.7 }}
  >
    {formatted.day}
  </Typography>

  <Typography
    variant="caption"
    sx={{ opacity: 0.6 }}
  >
    {formatted.time}
  </Typography>
</Box>

        </Box>

        <Divider sx={{ my: 3, background: "rgba(255,255,255,0.1)" }} />

        {/* Exercises */}
        {workout.exercises?.map((ex, i) => (
          <Box
            key={i}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: "#0f172a",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={ex.exercise_image}
                variant="rounded"
                sx={{ width: 60, height: 60 }}
              />

              <Box>
                <Typography fontWeight="medium">
                  {ex.excercise_name}
                </Typography>

                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  {ex.exercise_type}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={1} mt={2} flexWrap="wrap">
              {ex.sets?.map((set) => (
                <Chip
                  key={set.id}
                  label={`${set.weight}kg × ${set.reps}`}
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}

      </CardContent>
    </Card>
  );
}
