import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { formatSmartDate } from "../utils/dateUtils";

export default function SummarySection({ workouts, totalVolume }) {
  const latest = workouts[0];
  const formatted = latest
    ? formatSmartDate(latest.workout_perform_date)
    : null;

  return (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      
      {/* Total Workouts */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            background: "#1e293b",
            color: "white",
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 15px 30px rgba(0,0,0,0.5)",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>
              Total Workouts
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {workouts.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Volume */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            background: "#1e293b",
            color: "white",
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 15px 30px rgba(0,0,0,0.5)",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>
              Total Volume
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalVolume} kg
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Latest Workout */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            background: "#1e293b",
            color: "white",
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 15px 30px rgba(0,0,0,0.5)",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>
              Latest Workout
            </Typography>

            {latest && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <BoltIcon
                  sx={{
                    color: "#facc15",
                    filter: "drop-shadow(0 0 6px #facc15)",
                  }}
                />

                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {formatted.label}
                  </Typography>

                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {formatted.time}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
