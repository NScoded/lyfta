import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScaleIcon from "@mui/icons-material/Scale";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { formatSmartDate } from "../utils/dateUtils";

export default function WorkoutCard({ workout }) {
  const formatted = formatSmartDate(workout.workout_perform_date);

  const exerciseCount = workout.exercises?.length || 0;

  return (
    <Card
      sx={{
        position: "relative",
        mb: 3,

        background:
          "linear-gradient(145deg, rgba(30,41,59,0.94), rgba(15,23,42,0.98))",

        color: "white",

        borderRadius: "22px",

        border:
          "1px solid rgba(255,255,255,0.07)",

        overflow: "hidden",

        boxShadow:
          "0 15px 40px rgba(0,0,0,0.16)",

        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(34,211,238,0.18)",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.25)",
        },

        /* Top glow */
        "&::before": {
          content: '""',
          position: "absolute",

          top: 0,
          left: 0,
          right: 0,

          height: "2px",

          background:
            "linear-gradient(90deg, #22d3ee, #22c55e, transparent)",
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2.2, sm: 3 },

          "&:last-child": {
            pb: { xs: 2.2, sm: 3 },
          },
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            gap: 2,
          }}
        >
          {/* Left */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {/* Workout icon */}
            <Box
              sx={{
                width: 46,
                height: 46,

                borderRadius: "13px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.14), rgba(34,197,94,0.10))",

                border:
                  "1px solid rgba(34,211,238,0.12)",

                color: "#22d3ee",

                flexShrink: 0,
              }}
            >
              <FitnessCenterIcon />
            </Box>

            {/* Title */}
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.15rem",
                  },

                  fontWeight: 800,

                  letterSpacing: "-0.3px",

                  color: "#fff",
                }}
              >
                {workout.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                  mt: 0.5,
                }}
              >
                <ScaleIcon
                  sx={{
                    fontSize: 14,
                    color: "#22d3ee",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    color:
                      "rgba(255,255,255,0.45)",
                  }}
                >
                  {Number(
                    workout.total_volume || 0
                  ).toLocaleString()}{" "}
                  kg total volume
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,

              px: 1.5,
              py: 1,

              borderRadius: "12px",

              background:
                "rgba(255,255,255,0.035)",

              border:
                "1px solid rgba(255,255,255,0.06)",

              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <CalendarTodayIcon
              sx={{
                fontSize: 15,
                color: "#94a3b8",
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: "0.73rem",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                {formatted.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.65rem",
                  color:
                    "rgba(255,255,255,0.4)",
                  mt: 0.3,
                }}
              >
                {formatted.day} · {formatted.time}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* =====================================================
            SESSION META
        ===================================================== */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,

            mt: 2.5,
            mb: 2,
          }}
        >
          <Chip
            label={`${exerciseCount} ${
              exerciseCount === 1
                ? "Exercise"
                : "Exercises"
            }`}
            size="small"
            sx={{
              height: 27,

              background:
                "rgba(34,211,238,0.08)",

              border:
                "1px solid rgba(34,211,238,0.12)",

              color: "#67e8f9",

              fontSize: "0.68rem",
              fontWeight: 700,
            }}
          />

          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />
        </Box>

        {/* =====================================================
            EXERCISES
        ===================================================== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {workout.exercises?.map((ex, i) => (
            <Box
              key={i}
              sx={{
                p: { xs: 1.5, sm: 1.8 },

                borderRadius: "16px",

                background:
                  "rgba(2,6,23,0.55)",

                border:
                  "1px solid rgba(255,255,255,0.05)",

                transition: "all 0.25s ease",

                "&:hover": {
                  background:
                    "rgba(30,41,59,0.75)",

                  borderColor:
                    "rgba(34,211,238,0.13)",

                  transform:
                    "translateX(3px)",
                },
              }}
            >
              {/* Exercise information */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                {/* Image */}
                <Avatar
                  src={ex.exercise_image}
                  variant="rounded"
                  sx={{
                    width: {
                      xs: 50,
                      sm: 58,
                    },

                    height: {
                      xs: 50,
                      sm: 58,
                    },

                    borderRadius: "12px",

                    background:
                      "linear-gradient(135deg, #1e293b, #0f172a)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",
                  }}
                />

                {/* Name */}
                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "0.86rem",
                        sm: "0.92rem",
                      },

                      fontWeight: 700,

                      color: "#f8fafc",

                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ex.excercise_name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.67rem",

                      color:
                        "rgba(255,255,255,0.4)",

                      mt: 0.4,

                      textTransform:
                        "capitalize",
                    }}
                  >
                    {ex.exercise_type}
                  </Typography>
                </Box>

                <ArrowForwardIosIcon
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },

                    fontSize: 12,

                    color:
                      "rgba(255,255,255,0.18)",
                  }}
                />
              </Box>

              {/* Sets */}
              <Box
                sx={{
                  display: "flex",
                  gap: 0.8,

                  mt: 1.5,

                  flexWrap: "wrap",
                }}
              >
                {ex.sets?.map((set) => (
                  <Chip
                    key={set.id}
                    label={`${set.weight}kg × ${set.reps}`}
                    size="small"
                    sx={{
                      height: 28,

                      background:
                        "rgba(255,255,255,0.055)",

                      border:
                        "1px solid rgba(255,255,255,0.06)",

                      color:
                        "rgba(255,255,255,0.75)",

                      fontSize: "0.67rem",

                      fontWeight: 700,

                      "&:hover": {
                        background:
                          "rgba(34,211,238,0.08)",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}