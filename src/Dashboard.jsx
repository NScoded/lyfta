import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import axios from "axios";

import HeatmapCalendar from "./components/Charts/HeatmapCalendar";
import Navbar from "./components/Navbar";
import SummarySection from "./components/SummarySection";
import WorkoutCard from "./components/WorkoutCard";

import { calculateStreak } from "./utils/streakUtils";

export default function Dashboard() {
  /* ============================================================
     STATE
  ============================================================ */

  const [workouts, setWorkouts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Number of workout cards currently visible
  const [visibleCount, setVisibleCount] = useState(7);

  /* ============================================================
     FETCH WORKOUTS
  ============================================================ */

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get("/api/workouts");

        const data =
          res.data?.workouts ??
          res.data?.data?.workouts ??
          res.data?.data ??
          res.data;

        if (!Array.isArray(data)) {
          throw new Error(
            "Lyfta returned an unexpected workouts response."
          );
        }

        console.log("API WORKOUT COUNT:", data.length);

console.log(
  "API WORKOUT DATES:",
  data.map((workout) => workout.workout_perform_date)
);

setWorkouts(data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.error ||
            requestError.response?.data?.message ||
            requestError.message ||
            "Unable to load workouts."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* ============================================================
     TOTAL VOLUME
  ============================================================ */

  const totalVolume = useMemo(() => {
    return workouts.reduce(
      (sum, workout) =>
        sum + Number(workout.total_volume || 0),
      0
    );
  }, [workouts]);

  /* ============================================================
     STREAK
     
     IMPORTANT:
     This is only for the Navbar.
     It does NOT affect Total Days.
  ============================================================ */

  const streak = useMemo(() => {
    return calculateStreak(workouts);
  }, [workouts]);

  /* ============================================================
     TOTAL DAYS

     Every UNIQUE workout date = 1 day.

     Example:
     20 Sep -> 3 workouts = 1 day
     21 Sep -> 1 workout  = 1 day
     22 Sep -> 2 workouts = 1 day

     Total Days = 3

     Sunday is gym closed, so Sunday is ignored.

     This is ALL-TIME.
     It is NOT based on streak.
     It is NOT limited to the last 4 months.
  ============================================================ */

  const totalDays = useMemo(() => {
    const workoutDays = new Set();

    workouts.forEach((workout) => {
      if (!workout?.workout_perform_date) {
        return;
      }

      const dateKey = String(
        workout.workout_perform_date
      ).split(" ")[0];

      // Make sure date format is valid
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
        Sunday = gym closed.
        Do not count Sunday as a workout day.
      */
      if (date.getDay() === 0) {
        return;
      }

      workoutDays.add(dateKey);
    });

    return workoutDays.size;
  }, [workouts]);

  /* ============================================================
     VISIBLE WORKOUTS
  ============================================================ */

  const visibleWorkouts = useMemo(() => {
    return workouts.slice(0, visibleCount);
  }, [workouts, visibleCount]);

  const hasMoreWorkouts =
    visibleCount < workouts.length;

  /* ============================================================
     SHOW MORE
  ============================================================ */

  const handleShowMore = () => {
    setVisibleCount(
      (previous) => previous + 7
    );
  };

  /* ============================================================
     LOADING STATE
  ============================================================ */

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          background:
            "radial-gradient(circle at top, #172554 0%, #0f172a 38%, #020617 100%)",

          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: 2,
          }}
        >
          <CircularProgress
            size={38}
            thickness={4}
            sx={{
              color: "#22d3ee",
            }}
          />

          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.55)",

              fontSize: "0.85rem",
            }}
          >
            Loading your workouts...
          </Typography>
        </Box>
      </Box>
    );
  }

  /* ============================================================
     DASHBOARD
  ============================================================ */

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background: `
          radial-gradient(
            circle at 15% 0%,
            rgba(37, 99, 235, 0.12),
            transparent 28%
          ),
          radial-gradient(
            circle at 90% 10%,
            rgba(6, 182, 212, 0.08),
            transparent 25%
          ),
          linear-gradient(
            135deg,
            #020617 0%,
            #0f172a 50%,
            #020617 100%
          )
        `,

        color: "white",

        position: "relative",

        overflowX: "hidden",
      }}
    >
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <Navbar streak={streak} />

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            sm: 4,
            md: 5,
          },

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,

              borderRadius: "14px",

              background:
                "rgba(239,68,68,0.08)",

              border:
                "1px solid rgba(239,68,68,0.18)",

              color: "#fecaca",

              "& .MuiAlert-icon": {
                color: "#f87171",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* ======================================================
            PAGE INTRO
        ====================================================== */}

        <Box
          sx={{
            mb: {
              xs: 3,
              md: 4,
            },

            display: "flex",

            justifyContent: "space-between",

            alignItems: {
              xs: "flex-start",
              sm: "flex-end",
            },

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.65rem",
                  sm: "2rem",
                  md: "2.25rem",
                },

                fontWeight: 850,

                letterSpacing: "-1.2px",

                lineHeight: 1.1,

                background:
                  "linear-gradient(90deg, #f8fafc, #94a3b8)",

                WebkitBackgroundClip: "text",

                WebkitTextFillColor:
                  "transparent",
              }}
            >
              Your Training Dashboard
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color:
                  "rgba(255,255,255,0.42)",

                fontSize: {
                  xs: "0.76rem",
                  sm: "0.82rem",
                },
              }}
            >
              Track your workouts, consistency
              and progress.
            </Typography>
          </Box>

          
        </Box>

        {/* ======================================================
            SUMMARY
        ====================================================== */}

        <SummarySection
          workouts={workouts}
          totalVolume={totalVolume}
        />

        {/* ======================================================
            HEATMAP
        ====================================================== */}

        <HeatmapCalendar
          workouts={workouts}
        />

        {/* ======================================================
            WORKOUT HISTORY HEADER
        ====================================================== */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 1.5,

            mb: 2.5,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 26,

              borderRadius: "10px",

              background:
                "linear-gradient(#22d3ee, #3b82f6)",
            }}
          />

          <Box>
            <Typography
              sx={{
                fontSize: "1.15rem",

                fontWeight: 800,

                color: "#f8fafc",
              }}
            >
              Workout History
            </Typography>

            <Typography
              sx={{
                mt: 0.2,

                fontSize: "0.7rem",

                color:
                  "rgba(255,255,255,0.35)",
              }}
            >
              Showing {visibleWorkouts.length} of{" "}
              {workouts.length} workouts
            </Typography>
          </Box>
        </Box>

        {/* ======================================================
            WORKOUT CARDS
        ====================================================== */}

        {visibleWorkouts.length > 0 ? (
          <Box>
            {visibleWorkouts.map(
              (workout, index) => (
                <WorkoutCard
                  key={
                    workout.id ??
                    `${workout.workout_perform_date}-${index}`
                  }
                  workout={workout}
                />
              )
            )}
          </Box>
        ) : (
          /* ====================================================
             EMPTY STATE
          ==================================================== */

          <Box
            sx={{
              py: 8,
              px: 3,

              textAlign: "center",

              borderRadius: "20px",

              background:
                "rgba(255,255,255,0.025)",

              border:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",

                fontWeight: 700,

                color: "#e2e8f0",
              }}
            >
              No workouts found
            </Typography>

            <Typography
              sx={{
                mt: 0.8,

                fontSize: "0.75rem",

                color:
                  "rgba(255,255,255,0.35)",
              }}
            >
              Your completed workouts will
              appear here.
            </Typography>
          </Box>
        )}

        {/* ======================================================
            SHOW MORE
        ====================================================== */}

        {hasMoreWorkouts && (
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",

              mt: 4,

              mb: 2,
            }}
          >
            <Button
              onClick={handleShowMore}
              endIcon={
                <KeyboardArrowDownIcon />
              }
              sx={{
                px: 3.5,
                py: 1.2,

                borderRadius: "14px",

                textTransform: "none",

                fontSize: "0.8rem",

                fontWeight: 800,

                color: "#67e8f9",

                background:
                  "rgba(34,211,238,0.06)",

                border:
                  "1px solid rgba(34,211,238,0.15)",

                boxShadow:
                  "0 8px 25px rgba(34,211,238,0.05)",

                transition:
                  "all 0.25s ease",

                "&:hover": {
                  background:
                    "rgba(34,211,238,0.11)",

                  borderColor:
                    "rgba(34,211,238,0.3)",

                  transform:
                    "translateY(-2px)",

                  boxShadow:
                    "0 12px 30px rgba(34,211,238,0.1)",
                },
              }}
            >
              Show More
            </Button>
          </Box>
        )}

        {/* ======================================================
            END MESSAGE
        ====================================================== */}

        {!hasMoreWorkouts &&
          workouts.length > 0 && (
            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: 1,

                mt: 4,

                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 35,
                  height: "1px",

                  background:
                    "rgba(255,255,255,0.08)",
                }}
              />
              

              <Typography
                sx={{
                  fontSize: "0.65rem",

                  color:
                    "rgba(255,255,255,0.25)",
                }}
              >
                All workouts loaded
              </Typography>

              <Box
                sx={{
                  width: 35,
                  height: "1px",

                  background:
                    "rgba(255,255,255,0.08)",
                }}
              />
            </Box>
          )}
      </Container>
    </Box>
  );
}

