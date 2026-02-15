import express from "express";
import axios from "axios";

const router = express.Router();

// WORKOUTS
router.get("/workouts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://my.lyfta.app/api/v1/workouts",
      {
        headers: {
          Authorization: `Bearer ${process.env.LYFTA_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || error.message);
  }
});

// WORKOUT SUMMARY
router.get("/workouts-summary", async (req, res) => {
  try {
    const response = await axios.get(
      "https://my.lyfta.app/api/v1/workouts/summary",
      {
        headers: {
          Authorization: `Bearer ${process.env.LYFTA_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || error.message);
  }
});

// EXERCISES
router.get("/exercises", async (req, res) => {
  try {
    const response = await axios.get(
      "https://my.lyfta.app/api/v1/exercises",
      {
        headers: {
          Authorization: `Bearer ${process.env.LYFTA_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || error.message);
  }
});

// EXERCISE PROGRESS
router.get("/exercise-progress", async (req, res) => {
  try {
    const response = await axios.get(
      "https://my.lyfta.app/api/v1/exercises/progress",
      {
        headers: {
          Authorization: `Bearer ${process.env.LYFTA_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || error.message);
  }
});

export default router;
