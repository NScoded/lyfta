import {
  Box,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function HeatmapCalendar({
  workouts = [],
}) {
  /* ============================================================
     DATE HELPER

     IMPORTANT:
     Do NOT use toISOString() for calendar dates.
     It can shift the date because of timezone conversion.
  ============================================================ */

  const formatDateKey = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* ============================================================
     DATE KEY -> LOCAL DATE

     Used when we already have a YYYY-MM-DD string.
     This avoids timezone shifting.
  ============================================================ */

  const dateKeyToLocalDate = (dateKey) => {
    const [year, month, day] =
      dateKey.split("-").map(Number);

    return new Date(
      year,
      month - 1,
      day
    );
  };

  /* ============================================================
     PREPARE WORKOUT DATA
  ============================================================ */

  const workoutDates = workouts
    .map((w) => {
      if (!w?.workout_perform_date) {
        return null;
      }

      /*
        Example:
        "2026-09-27 14:33:18"

        We only need:
        "2026-09-27"

        Do NOT convert this using new Date()
        because timezone conversion can change the date.
      */

      const rawDate = String(
        w.workout_perform_date
      );

      const dateKey = rawDate.split(" ")[0];

      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
          dateKey
        )
      ) {
        return null;
      }

      return dateKey;
    })
    .filter(Boolean);

  const workoutDateSet = new Set(
    workoutDates
  );

  /* ============================================================
     SUNDAY CHECK

     Sunday is always a gym rest day.
     It should NEVER count as an active workout day.
  ============================================================ */

  const isSundayDateKey = (dateKey) => {
    const date =
      dateKeyToLocalDate(dateKey);

    return date.getDay() === 0;
  };

  /* ============================================================
     MAXIMUM STREAK

     Rules:
     Monday -> Saturday = workout days
     Sunday = fixed rest day

     Sunday does NOT break the streak.
  ============================================================ */

  const calculateMaxStreak = (dateSet) => {
    const gymDates = Array.from(dateSet)
      .filter(
        (dateKey) =>
          !isSundayDateKey(dateKey)
      )
      .sort();

    if (gymDates.length === 0) {
      return 0;
    }

    let maxStreak = 0;
    let currentStreak = 0;

    for (
      let i = 0;
      i < gymDates.length;
      i++
    ) {
      if (i === 0) {
        currentStreak = 1;
      } else {
        const previousDate =
          dateKeyToLocalDate(
            gymDates[i - 1]
          );

        const currentDate =
          dateKeyToLocalDate(
            gymDates[i]
          );

        const difference =
          (currentDate - previousDate) /
          (1000 * 60 * 60 * 24);

        /*
          Normal consecutive day:
          Monday -> Tuesday
          Tuesday -> Wednesday
          etc.

          Saturday -> Monday:
          Difference = 2
          Sunday is ignored.
        */

        const isNormalNextDay =
          difference === 1;

        const isSaturdayToMonday =
          previousDate.getDay() === 6 &&
          currentDate.getDay() === 1 &&
          difference === 2;

        if (
          isNormalNextDay ||
          isSaturdayToMonday
        ) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }

      maxStreak = Math.max(
        maxStreak,
        currentStreak
      );
    }

    return maxStreak;
  };

  const maximumStreak =
    calculateMaxStreak(workoutDateSet);

  /* ============================================================
     UNIQUE EXERCISE TYPES

     We collect every exercise name from every workout.

     Example:

     Workout 1:
       Bench Press
       Squat

     Workout 2:
       Bench Press
       Lat Pulldown

     Result:
       Bench Press
       Squat
       Lat Pulldown

     Count = 3
  ============================================================ */

  const uniqueExerciseTypes = new Set();

  workouts.forEach((workout) => {
    if (
      !Array.isArray(workout?.exercises)
    ) {
      return;
    }

    workout.exercises.forEach(
      (exercise) => {
        const exerciseName =
          exercise?.excercise_name;

        if (
          typeof exerciseName ===
            "string" &&
          exerciseName.trim()
        ) {
          uniqueExerciseTypes.add(
            exerciseName
              .trim()
              .toLowerCase()
          );
        }
      }
    );
  });

  const totalExerciseTypes =
    uniqueExerciseTypes.size;

  /* ============================================================
     LAST 4 MONTHS
  ============================================================ */

  const today = new Date();

  const months = Array.from(
    { length: 4 },
    (_, index) => {
      return new Date(
        today.getFullYear(),
        today.getMonth() -
          (3 - index),
        1
      );
    }
  );

  /* ============================================================
     MONTH DATA
  ============================================================ */

  const getMonthData = (monthDate) => {
    const year =
      monthDate.getFullYear();

    const month =
      monthDate.getMonth();

    const daysInMonth =
      new Date(
        year,
        month + 1,
        0
      ).getDate();

    const activeDays = [];

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      const date = new Date(
        year,
        month,
        day
      );

      const dateString =
        formatDateKey(date);

      /*
        Sunday is a gym rest day.
        Therefore Sunday should NOT be
        included in active days.
      */

      const isSunday =
        date.getDay() === 0;

      if (
        !isSunday &&
        workoutDateSet.has(
          dateString
        )
      ) {
        activeDays.push(day);
      }
    }

    return {
      year,
      month,
      daysInMonth,
      activeDays,
    };
  };

  /* ============================================================
     FORMAT MONTH
  ============================================================ */

  const formatMonth = (date) => {
    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
      }
    );
  };

  const formatFullMonth = (date) => {
    return date.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );
  };

  /* ============================================================
     DAY LABELS
  ============================================================ */

  const weekdays = [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
  ];

  const todayString =
    formatDateKey(today);

  /* ============================================================
     UI
  ============================================================ */

  return (
    <Box
      sx={{
        mb: 5,

        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },

        borderRadius: "24px",

        background:
          "linear-gradient(160deg, #111827 0%, #0b1220 100%)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        boxShadow:
          "0 20px 60px rgba(0,0,0,0.25)",

        overflow: "hidden",
      }}
    >
      {/* ========================================================
          TOP HEADER
      ======================================================== */}

      <Box
        sx={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: {
            xs: "flex-start",
            md: "center",
          },

          flexDirection: {
            xs: "column",
            md: "row",
          },

          gap: 2,

          mb: 3,
        }}
      >
        {/* LEFT */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,

              borderRadius: "15px",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              background:
                "linear-gradient(135deg, #312e81, #1e40af)",

              boxShadow:
                "0 8px 25px rgba(59,130,246,0.2)",

              color: "#93c5fd",
            }}
          >
            <CalendarMonthIcon />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.15rem",
                },

                fontWeight: 800,

                color: "#f8fafc",

                letterSpacing:
                  "-0.4px",
              }}
            >
              Training Activity
            </Typography>

            <Typography
              sx={{
                mt: 0.4,

                fontSize: "0.72rem",

                color:
                  "rgba(255,255,255,0.38)",
              }}
            >
              Your last 4 months at a glance
            </Typography>
          </Box>
        </Box>

        {/* ======================================================
            RIGHT STATS
        ====================================================== */}

        <Box
          sx={{
            display: "flex",

            gap: 1,

            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          {/* ====================================================
              EXERCISE TYPES
          ==================================================== */}

          <Box
            sx={{
              flex: 1,

              minWidth: {
                md: 140,
              },

              px: 1.5,
              py: 1.1,

              borderRadius: "14px",

              background:
                "rgba(255,255,255,0.035)",

              border:
                "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.62rem",

                color:
                  "rgba(255,255,255,0.35)",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.8px",
              }}
            >
              Total Variations
            </Typography>

            <Typography
              sx={{
                mt: 0.3,

                fontSize: "1rem",

                fontWeight: 800,

                color: "#67e8f9",
              }}
            >
              {totalExerciseTypes}
            </Typography>
          </Box>

          {/* ====================================================
              MAXIMUM STREAK
          ==================================================== */}

          <Box
            sx={{
              flex: 1,

              minWidth: {
                md: 120,
              },

              px: 1.5,
              py: 1.1,

              borderRadius: "14px",

              background:
                "rgba(255,255,255,0.035)",

              border:
                "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.62rem",

                color:
                  "rgba(255,255,255,0.35)",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.8px",
              }}
            >
              Max Streak
            </Typography>

            <Typography
              sx={{
                mt: 0.3,

                fontSize: "1rem",

                fontWeight: 800,

                color: "#fb923c",
              }}
            >
              {maximumStreak} days
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ========================================================
          MONTH TIMELINE
      ======================================================== */}

      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          gap: 1,

          mb: 3,

          overflowX: "auto",

          pb: 0.5,

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {months.map(
          (month, index) => {
            const isCurrent =
              month.getMonth() ===
                today.getMonth() &&
              month.getFullYear() ===
                today.getFullYear();

            return (
              <Box
                key={index}
                sx={{
                  flex: {
                    xs: "0 0 auto",
                    md: 1,
                  },

                  minWidth: {
                    xs: 100,
                    md: "auto",
                  },

                  px: 1.5,
                  py: 1,

                  borderRadius: "12px",

                  background: isCurrent
                    ? "rgba(59,130,246,0.12)"
                    : "rgba(255,255,255,0.025)",

                  border: isCurrent
                    ? "1px solid rgba(59,130,246,0.25)"
                    : "1px solid rgba(255,255,255,0.04)",

                  color: isCurrent
                    ? "#93c5fd"
                    : "rgba(255,255,255,0.4)",

                  textAlign: "center",

                  transition:
                    "0.25s ease",

                  "&:hover": {
                    background:
                      "rgba(59,130,246,0.1)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {formatMonth(month)}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,

                    fontSize: "0.6rem",

                    opacity: 0.55,
                  }}
                >
                  {month.getFullYear()}
                </Typography>
              </Box>
            );
          }
        )}
      </Box>

      {/* ========================================================
          MONTH CARDS
      ======================================================== */}

      <Box
        sx={{
          display: "flex",

          gap: 1.5,

          overflowX: "auto",

          pb: 1,

          "&::-webkit-scrollbar": {
            height: 5,
          },

          "&::-webkit-scrollbar-track": {
            background:
              "rgba(255,255,255,0.02)",

            borderRadius: 10,
          },

          "&::-webkit-scrollbar-thumb": {
            background:
              "rgba(255,255,255,0.12)",

            borderRadius: 10,
          },
        }}
      >
        {months.map(
          (month, monthIndex) => {
            const data =
              getMonthData(month);

            const isCurrent =
              month.getMonth() ===
                today.getMonth() &&
              month.getFullYear() ===
                today.getFullYear();

            return (
              <Box
                key={monthIndex}
                sx={{
                  flex: {
                    xs: "0 0 270px",
                    sm: "0 0 300px",
                    md: 1,
                  },

                  minWidth: {
                    md: 0,
                  },

                  p: 2,

                  borderRadius: "18px",

                  background: isCurrent
                    ? "linear-gradient(145deg, rgba(30,58,138,0.24), rgba(15,23,42,0.7))"
                    : "rgba(255,255,255,0.025)",

                  border: isCurrent
                    ? "1px solid rgba(96,165,250,0.18)"
                    : "1px solid rgba(255,255,255,0.045)",

                  transition:
                    "0.3s ease",

                  "&:hover": {
                    transform:
                      "translateY(-3px)",

                    borderColor:
                      "rgba(96,165,250,0.2)",
                  },
                }}
              >
                {/* =================================================
                    MONTH HEADER
                ================================================= */}

                <Box
                  sx={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    mb: 1.8,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize:
                          "0.88rem",

                        fontWeight: 800,

                        color: "#f8fafc",
                      }}
                    >
                      {formatFullMonth(
                        month
                      )}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.3,

                        fontSize:
                          "0.62rem",

                        color:
                          "rgba(255,255,255,0.35)",
                      }}
                    >
                      {
                        data.activeDays
                          .length
                      }{" "}
                      workout days
                    </Typography>
                  </Box>

                  {isCurrent && (
                    <Chip
                      label="NOW"
                      size="small"
                      sx={{
                        height: 23,

                        background:
                          "rgba(59,130,246,0.15)",

                        color:
                          "#93c5fd",

                        border:
                          "1px solid rgba(59,130,246,0.2)",

                        fontSize:
                          "0.58rem",

                        fontWeight: 800,
                      }}
                    />
                  )}
                </Box>

                {/* =================================================
                    WEEKDAY HEADER
                ================================================= */}

                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns:
                      "repeat(7, 1fr)",

                    gap: 0.6,

                    mb: 0.7,
                  }}
                >
                  {weekdays.map(
                    (day, index) => (
                      <Typography
                        key={index}
                        sx={{
                          textAlign:
                            "center",

                          fontSize:
                            "0.55rem",

                          color:
                            "rgba(255,255,255,0.25)",

                          fontWeight: 700,
                        }}
                      >
                        {day}
                      </Typography>
                    )
                  )}
                </Box>

                {/* =================================================
                    CALENDAR GRID
                ================================================= */}

                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns:
                      "repeat(7, 1fr)",

                    gap: 0.6,
                  }}
                >
                  {/* EMPTY DAYS BEFORE MONTH */}

                  {Array.from({
                    length: new Date(
                      data.year,
                      data.month,
                      1
                    ).getDay(),
                  }).map(
                    (_, index) => (
                      <Box
                        key={`empty-${index}`}
                        sx={{
                          aspectRatio:
                            "1",
                        }}
                      />
                    )
                  )}

                  {/* =================================================
                      DAYS
                  ================================================= */}

                  {Array.from({
                    length:
                      data.daysInMonth,
                  }).map(
                    (_, index) => {
                      const day =
                        index + 1;

                      const date =
                        new Date(
                          data.year,
                          data.month,
                          day
                        );

                      /*
                        IMPORTANT:
                        Never use toISOString()
                        here.
                      */

                      const dateString =
                        formatDateKey(date);

                      /* ========================================
                         SUNDAY
                      ======================================== */

                      const isSunday =
                        date.getDay() === 0;

                      /* ========================================
                         ACTIVE WORKOUT
                      ======================================== */

                      const isActive =
                        !isSunday &&
                        workoutDateSet.has(
                          dateString
                        );

                      /* ========================================
                         TODAY
                      ======================================== */

                      const isToday =
                        dateString ===
                        todayString;

                      /* ========================================
                         TOOLTIP
                      ======================================== */

                      const tooltipText =
                        isSunday
                          ? `${dateString} • Gym Closed / Rest Day`
                          : isActive
                          ? `${dateString} • Workout`
                          : `${dateString} • No Workout`;

                      return (
                        <Tooltip
                          key={day}
                          title={
                            tooltipText
                          }
                          arrow
                        >
                          <Box
                            sx={{
                              position:
                                "relative",

                              aspectRatio:
                                "1",

                              borderRadius:
                                "5px",

                              background:
                                isSunday
                                  ? "rgba(148,163,184,0.14)"
                                  : isActive
                                  ? "linear-gradient(135deg, #22d3ee, #3b82f6)"
                                  : "rgba(255,255,255,0.045)",

                              border:
                                isToday
                                  ? "2px solid #fff"
                                  : isSunday
                                  ? "1px solid rgba(148,163,184,0.28)"
                                  : "1px solid rgba(255,255,255,0.025)",

                              boxShadow:
                                isActive
                                  ? "0 3px 10px rgba(34,211,238,0.18)"
                                  : "none",

                              cursor:
                                "pointer",

                              transition:
                                "all 0.18s ease",

                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "center",

                              "&:hover":
                                {
                                  transform:
                                    "scale(1.18)",

                                  zIndex: 2,

                                  background:
                                    isSunday
                                      ? "rgba(148,163,184,0.23)"
                                      : isActive
                                      ? "linear-gradient(135deg, #67e8f9, #60a5fa)"
                                      : "rgba(255,255,255,0.12)",
                                },
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize:
                                  "0.52rem",

                                fontWeight:
                                  isToday ||
                                  isActive
                                    ? 800
                                    : 500,

                                color:
                                  isSunday
                                    ? "#facc15"
                                    : isActive
                                    ? "#fff"
                                    : "rgba(255,255,255,0.28)",
                              }}
                            >
                              {day}
                            </Typography>
                          </Box>
                        </Tooltip>
                      );
                    }
                  )}
                </Box>

                {/* =================================================
                    MONTH FOOTER
                ================================================= */}

                <Box
                  sx={{
                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "space-between",

                    mt: 2,

                    pt: 1.5,

                    borderTop:
                      "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",

                      alignItems:
                        "center",

                      gap: 0.6,
                    }}
                  >
                    <LocalFireDepartmentIcon
                      sx={{
                        fontSize: 14,

                        color: "#fb923c",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize:
                          "0.62rem",

                        color:
                          "rgba(255,255,255,0.4)",
                      }}
                    >
                      {
                        data.activeDays
                          .length
                      }{" "}
                      active
                    </Typography>
                  </Box>

                  <ChevronRightIcon
                    sx={{
                      fontSize: 15,

                      color:
                        "rgba(255,255,255,0.2)",
                    }}
                  />
                </Box>
              </Box>
            );
          }
        )}
      </Box>

      {/* ========================================================
          FOOTER INSIGHT
      ======================================================== */}

      <Box
        sx={{
          mt: 2,

          p: 1.5,

          borderRadius: "14px",

          display: "flex",

          alignItems: "center",

          gap: 1.2,

          background:
            "rgba(255,255,255,0.025)",

          border:
            "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <TrendingUpIcon
          sx={{
            fontSize: 18,

            color: "#4ade80",
          }}
        />

        <Typography
          sx={{
            fontSize: "0.68rem",

            color:
              "rgba(255,255,255,0.42)",
          }}
        >
          Keep showing up. Consistency is
          built one workout at a time.
        </Typography>

        <FitnessCenterIcon
          sx={{
            ml: "auto",

            fontSize: 17,

            color:
              "rgba(255,255,255,0.18)",
          }}
        />
      </Box>
    </Box>
  );
}