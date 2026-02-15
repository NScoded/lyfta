import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import axios from "axios";

import HeatmapCalendar from "./components/Charts/HeatmapCalendar";



import Navbar from "./components/Navbar";
import SummarySection from "./components/SummarySection";
import WorkoutCard from "./components/WorkoutCard";

import { calculateStreak } from "./utils/streakUtils";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:5000/api/workouts");
      setWorkouts(res.data.workouts || res.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 10, color: "white" }}>
        Loading...
      </Typography>
    );

  const totalVolume = workouts.reduce(
    (sum, w) => sum + Number(w.total_volume),
    0
  );

  const streak = calculateStreak(workouts);

  return (
  <Box
    sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Navbar streak={streak} />

    <Container sx={{ py: 6 }}>
      <SummarySection
        workouts={workouts}
        totalVolume={totalVolume}
      />

      <HeatmapCalendar workouts={workouts} />

      {workouts.map((w) => (
        <WorkoutCard key={w.id} workout={w} />
      ))}
    </Container>
  </Box>
);

}
