import express from "express";
import axios from "axios";

const router = express.Router();

/* ============================================================
   LYFTA API CONFIG
============================================================ */

const LYFTA_API_URL = "https://my.lyfta.app/api/v1";

const getLyftaHeaders = () => ({
  Authorization: `Bearer ${process.env.LYFTA_API_KEY}`,
  Accept: "application/json",
});

/* ============================================================
   API KEY CHECK
============================================================ */

const checkApiKey = (res) => {
  if (!process.env.LYFTA_API_KEY) {
    res.status(503).json({
      error:
        "Lyfta API key is missing. Set LYFTA_API_KEY in the project .env file.",
    });

    return false;
  }

  return true;
};

/* ============================================================
   WORKOUTS
============================================================ */

/*
  Lyfta API uses pagination.

  Example:
  Page 1 -> 20 workouts
  Page 2 -> 20 workouts
  Page 3 -> remaining workouts

  This route fetches every page and combines them into
  one workouts array for the frontend.
*/

router.get("/workouts", async (req, res) => {
  if (!checkApiKey(res)) {
    return;
  }

  try {
    const headers = getLyftaHeaders();

    const allWorkouts = [];

    /* --------------------------------------------------------
       FIRST PAGE
    -------------------------------------------------------- */

    const firstResponse = await axios.get(
      `${LYFTA_API_URL}/workouts`,
      {
        headers,
        params: {
          page: 1,
          limit: 20,
        },
      }
    );

    const firstData = firstResponse.data;

    /* --------------------------------------------------------
       ADD FIRST PAGE WORKOUTS
    -------------------------------------------------------- */

    if (Array.isArray(firstData?.workouts)) {
      allWorkouts.push(...firstData.workouts);
    }

    /* --------------------------------------------------------
       TOTAL PAGES
    -------------------------------------------------------- */

    const totalPages = Number(
      firstData?.total_pages || 1
    );

    /* --------------------------------------------------------
       FETCH REMAINING PAGES
    -------------------------------------------------------- */

    for (
      let page = 2;
      page <= totalPages;
      page++
    ) {
      const response = await axios.get(
        `${LYFTA_API_URL}/workouts`,
        {
          headers,
          params: {
            page,
            limit: 20,
          },
        }
      );

      const data = response.data;

      if (Array.isArray(data?.workouts)) {
        allWorkouts.push(...data.workouts);
      }
    }

    /* --------------------------------------------------------
       SORT WORKOUTS
       Newest workout first
    -------------------------------------------------------- */

    allWorkouts.sort((a, b) => {
      return (
        new Date(b.workout_perform_date) -
        new Date(a.workout_perform_date)
      );
    });

   

    /* --------------------------------------------------------
       RESPONSE
    -------------------------------------------------------- */

    return res.json({
      workouts: allWorkouts,
      total_records: allWorkouts.length,
    });
  } catch (error) {
    console.error(
      "Lyfta workouts API error:",
      error.response?.data ||
        error.message
    );

    return res.status(
      error.response?.status || 500
    ).json(
      error.response?.data || {
        error: error.message,
      }
    );
  }
});

/* ============================================================
   WORKOUT SUMMARY
============================================================ */

router.get(
  "/workouts-summary",
  async (req, res) => {
    if (!checkApiKey(res)) {
      return;
    }

    try {
      const response = await axios.get(
        `${LYFTA_API_URL}/workouts/summary`,
        {
          headers: getLyftaHeaders(),
        }
      );

      return res.json(response.data);
    } catch (error) {
      console.error(
        "Lyfta workout summary API error:",
        error.response?.data ||
          error.message
      );

      return res.status(
        error.response?.status || 500
      ).json(
        error.response?.data || {
          error: error.message,
        }
      );
    }
  }
);

/* ============================================================
   EXERCISES
============================================================ */

router.get(
  "/exercises",
  async (req, res) => {
    if (!checkApiKey(res)) {
      return;
    }

    try {
      const response = await axios.get(
        `${LYFTA_API_URL}/exercises`,
        {
          headers: getLyftaHeaders(),
        }
      );

      return res.json(response.data);
    } catch (error) {
      console.error(
        "Lyfta exercises API error:",
        error.response?.data ||
          error.message
      );

      return res.status(
        error.response?.status || 500
      ).json(
        error.response?.data || {
          error: error.message,
        }
      );
    }
  }
);

/* ============================================================
   EXERCISE PROGRESS
============================================================ */

router.get(
  "/exercise-progress",
  async (req, res) => {
    if (!checkApiKey(res)) {
      return;
    }

    try {
      const response = await axios.get(
        `${LYFTA_API_URL}/exercises/progress`,
        {
          headers: getLyftaHeaders(),
        }
      );

      return res.json(response.data);
    } catch (error) {
      console.error(
        "Lyfta exercise progress API error:",
        error.response?.data ||
          error.message
      );

      return res.status(
        error.response?.status || 500
      ).json(
        error.response?.data || {
          error: error.message,
        }
      );
    }
  }
);

/* ============================================================
   EXPORT ROUTER
============================================================ */

export default router;