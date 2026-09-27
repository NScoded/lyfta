import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BoltIcon from "@mui/icons-material/Bolt";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { formatSmartDate } from "../utils/dateUtils";

export default function SummarySection({ workouts, totalVolume }) {
  const latest = workouts[0];

  const formatted = latest
    ? formatSmartDate(latest.workout_perform_date)
    : null;

  return (
    <Grid
      container
      spacing={2.5}
      sx={{
        mb: 5,
      }}
    >
      {/* =========================================================
          TOTAL WORKOUTS
      ========================================================= */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            position: "relative",
            height: "100%",
            overflow: "hidden",

            background:
              "linear-gradient(145deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))",

            color: "white",

            borderRadius: "20px",

            border:
              "1px solid rgba(255,255,255,0.07)",

            boxShadow:
              "0 12px 35px rgba(0,0,0,0.18)",

            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-6px)",
              borderColor: "rgba(34,197,94,0.25)",
              boxShadow:
                "0 18px 45px rgba(34,197,94,0.10)",
            },

            "&::before": {
              content: '""',
              position: "absolute",

              width: 130,
              height: 130,

              top: -70,
              right: -60,

              borderRadius: "50%",

              background:
                "rgba(34,197,94,0.10)",

              filter: "blur(5px)",
            },
          }}
        >
          <CardContent
            sx={{
              position: "relative",
              p: 3,

              "&:last-child": {
                pb: 3,
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                Total Workouts
              </Typography>

              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "12px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background:
                    "rgba(34,197,94,0.12)",

                  color: "#4ade80",
                }}
              >
                <FitnessCenterIcon />
              </Box>
            </Box>

            {/* Number */}
            <Typography
              sx={{
                fontSize: {
                  xs: "2.3rem",
                  md: "2.6rem",
                },

                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1,
              }}
            >
              {workouts.length}
            </Typography>

            {/* Bottom info */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
                mt: 2,
              }}
            >
              <TrendingUpIcon
                sx={{
                  fontSize: 17,
                  color: "#4ade80",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Sessions completed
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* =========================================================
          TOTAL VOLUME
      ========================================================= */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            position: "relative",
            height: "100%",
            overflow: "hidden",

            background:
              "linear-gradient(145deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))",

            color: "white",

            borderRadius: "20px",

            border:
              "1px solid rgba(255,255,255,0.07)",

            boxShadow:
              "0 12px 35px rgba(0,0,0,0.18)",

            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-6px)",
              borderColor: "rgba(6,182,212,0.28)",
              boxShadow:
                "0 18px 45px rgba(6,182,212,0.10)",
            },

            "&::before": {
              content: '""',
              position: "absolute",

              width: 140,
              height: 140,

              top: -75,
              right: -60,

              borderRadius: "50%",

              background:
                "rgba(6,182,212,0.10)",

              filter: "blur(5px)",
            },
          }}
        >
          <CardContent
            sx={{
              position: "relative",
              p: 3,

              "&:last-child": {
                pb: 3,
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                Total Volume
              </Typography>

              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "12px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background:
                    "rgba(6,182,212,0.12)",

                  color: "#22d3ee",
                }}
              >
                <TrendingUpIcon />
              </Box>
            </Box>

            {/* Number */}
            <Typography
              sx={{
                fontSize: {
                  xs: "2.1rem",
                  md: "2.5rem",
                },

                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1,
              }}
            >
              {Number(totalVolume).toLocaleString()}
              <Box
                component="span"
                sx={{
                  ml: 1,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#22d3ee",
                  letterSpacing: 0,
                }}
              >
                kg
              </Box>
            </Typography>

            {/* Bottom info */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
                mt: 2,
              }}
            >
              <ArrowUpwardIcon
                sx={{
                  fontSize: 16,
                  color: "#22d3ee",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Total weight moved
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* =========================================================
          LATEST WORKOUT
      ========================================================= */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            position: "relative",
            height: "100%",
            overflow: "hidden",

            background:
              "linear-gradient(145deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))",

            color: "white",

            borderRadius: "20px",

            border:
              "1px solid rgba(255,255,255,0.07)",

            boxShadow:
              "0 12px 35px rgba(0,0,0,0.18)",

            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-6px)",
              borderColor: "rgba(250,204,21,0.28)",
              boxShadow:
                "0 18px 45px rgba(250,204,21,0.09)",
            },

            "&::before": {
              content: '""',
              position: "absolute",

              width: 140,
              height: 140,

              top: -70,
              right: -60,

              borderRadius: "50%",

              background:
                "rgba(250,204,21,0.08)",

              filter: "blur(5px)",
            },
          }}
        >
          <CardContent
            sx={{
              position: "relative",
              p: 3,

              "&:last-child": {
                pb: 3,
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                Latest Workout
              </Typography>

              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "12px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background:
                    "rgba(250,204,21,0.11)",

                  color: "#facc15",
                }}
              >
                <BoltIcon />
              </Box>
            </Box>

            {latest ? (
              <>
                {/* Workout name */}
                <Typography
                  sx={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    letterSpacing: "-0.5px",
                    mb: 1,
                  }}
                >
                  {formatted.label}
                </Typography>

                {/* Date */}
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.52)",
                    fontSize: "0.8rem",
                  }}
                >
                  {formatted.day}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "0.72rem",
                    mt: 0.5,
                  }}
                >
                  {formatted.time}
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.45)",
                  mt: 2,
                }}
              >
                No workouts yet
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}