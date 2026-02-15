import { Box, Avatar, Typography, Chip } from "@mui/material";

export default function ExerciseCard({ ex }) {
  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        background: "#0f172a",
        transition: "0.3s",
        "&:hover": {
          background: "#1e293b",
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={ex.exercise_image}
          variant="rounded"
          sx={{ width: 70, height: 70 }}
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
        {ex.sets.map((set) => (
          <Chip
            key={set.id}
            label={`${set.weight}kg × ${set.reps}`}
            sx={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontWeight: "bold",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
