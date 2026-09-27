import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Navbar({ streak = 0 }) {
  const hasStreak = streak > 0;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,

        background: `
          linear-gradient(
            180deg,
            rgba(8, 15, 28, 0.96) 0%,
            rgba(8, 15, 28, 0.88) 100%
          )
        `,

        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",

        borderBottom: "1px solid rgba(255,255,255,0.06)",

        boxShadow:
          "0 12px 45px rgba(0,0,0,0.25), inset 0 -1px 0 rgba(255,255,255,0.02)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 68, md: 76 },

          px: {
            xs: 1.5,
            sm: 3,
            md: 5,
            lg: 7,
          },

          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* =====================================================
            BRAND
        ===================================================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          {/* LOGO */}

          <Box
            sx={{
              position: "relative",

              width: { xs: 42, md: 46 },
              height: { xs: 42, md: 46 },

              borderRadius: "15px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background:
                "linear-gradient(135deg, #bef264 0%, #22c55e 48%, #06b6d4 100%)",

              boxShadow: `
                0 8px 28px rgba(34,197,94,0.28),
                0 0 0 1px rgba(255,255,255,0.08) inset
              `,

              overflow: "hidden",

              transition: "all 0.3s ease",

              "&:hover": {
                transform: "translateY(-2px) rotate(-2deg)",
                boxShadow:
                  "0 12px 36px rgba(34,197,94,0.38)",
              },

              "&::before": {
                content: '""',
                position: "absolute",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,0.15)",
                top: "-45px",
                right: "-30px",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                inset: 1,
                borderRadius: "14px",
                border:
                  "1px solid rgba(255,255,255,0.22)",
                pointerEvents: "none",
              },
            }}
          >
            <Box
              component="img"
              src="https://play-lh.googleusercontent.com/AX-6eXLHm5zP_VdCnZR5l0JCKpfkA2SgUHHtiLKl-o4zzh5Z21mDbHrjeUYEasrSjDYGWBJDhcKK8e1WjKEM%3Dw240-h480"
              alt="Lyfta"
              sx={{
                width: { xs: 29, md: 38 },
                height: { xs: 299, md: 38 },
                objectFit: "cover",
                borderRadius: "100px",
                zIndex: 1,
                filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
              }}
            />
          </Box>

          {/* BRAND TEXT */}

          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.15rem",
                    sm: "1.3rem",
                    md: "1.4rem",
                  },

                  fontWeight: 900,

                  letterSpacing: "-0.8px",

                  lineHeight: 1,

                  color: "#f8fafc",
                }}
              >
                Lyfta
              </Typography>

              {/* ONLINE DOT */}

              <Box
                sx={{
                  position: "relative",

                  width: 6,
                  height: 6,

                  borderRadius: "50%",

                  background: "#22c55e",

                  boxShadow:
                    "0 0 10px rgba(34,197,94,0.9)",

                  display: {
                    xs: "none",
                    sm: "block",
                  },

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: -3,
                    borderRadius: "50%",
                    border:
                      "1px solid rgba(34,197,94,0.3)",
                    animation:
                      "onlinePulse 2s ease-out infinite",
                  },

                  "@keyframes onlinePulse": {
                    "0%": {
                      transform: "scale(0.7)",
                      opacity: 0.8,
                    },
                    "100%": {
                      transform: "scale(2)",
                      opacity: 0,
                    },
                  },
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 0.55,

                fontSize: "0.6rem",

                color: "rgba(255,255,255,0.38)",

                letterSpacing: "1.6px",

                textTransform: "uppercase",

                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Train · Track · Improve
            </Typography>
          </Box>
        </Box>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0.7,
              sm: 1,
              md: 1.2,
            },
          }}
        >
          {/* =================================================
              ACTIVITY
          ================================================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              alignItems: "center",
              gap: 0.8,

              px: 1.4,
              py: 0.8,

              borderRadius: "12px",

              background:
                "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(6,182,212,0.04))",

              border:
                "1px solid rgba(34,197,94,0.12)",

              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)",
            }}
          >
            <TrendingUpIcon
              sx={{
                fontSize: 17,
                color: "#22c55e",
              }}
            />

            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#94a3b8",
              }}
            >
              Activity
            </Typography>
          </Box>

          {/* =================================================
              STREAK
          ================================================= */}

          <Tooltip
            title={
              hasStreak
                ? `${streak} consecutive workout ${
                    streak === 1 ? "day" : "days"
                  }`
                : "No active workout streak"
            }
            arrow
          >
            <Box
              sx={{
                position: "relative",

                display: "flex",
                alignItems: "center",

                gap: {
                  xs: 0.7,
                  sm: 1,
                },

                px: {
                  xs: 0.8,
                  sm: 1.3,
                  md: 1.6,
                },

                py: 0.65,

                borderRadius: "15px",

                background: hasStreak
                  ? "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(239,68,68,0.08))"
                  : "rgba(148,163,184,0.05)",

                border: hasStreak
                  ? "1px solid rgba(249,115,22,0.25)"
                  : "1px solid rgba(148,163,184,0.11)",

                boxShadow: hasStreak
                  ? "0 8px 28px rgba(249,115,22,0.10)"
                  : "none",

                transition: "all 0.25s ease",

                cursor: "default",

                "&:hover": {
                  transform: "translateY(-2px)",
                  borderColor: hasStreak
                    ? "rgba(249,115,22,0.45)"
                    : "rgba(148,163,184,0.22)",
                },
              }}
            >
              {/* FIRE */}

              <Box
                sx={{
                  width: {
                    xs: 32,
                    sm: 35,
                  },

                  height: {
                    xs: 32,
                    sm: 35,
                  },

                  borderRadius: "11px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background: hasStreak
                    ? "linear-gradient(135deg, #fb923c, #ef4444)"
                    : "rgba(100,116,139,0.16)",

                  boxShadow: hasStreak
                    ? "0 5px 18px rgba(249,115,22,0.3)"
                    : "none",

                  position: "relative",

                  overflow: "hidden",

                  "&::after": hasStreak
                    ? {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transform:
                          "translateX(-100%)",
                        animation:
                          "shine 3s infinite",
                      }
                    : {},

                  "@keyframes shine": {
                    "0%": {
                      transform: "translateX(-100%)",
                    },
                    "45%, 100%": {
                      transform: "translateX(100%)",
                    },
                  },
                }}
              >
                <LocalFireDepartmentIcon
                  sx={{
                    color: hasStreak
                      ? "#fff"
                      : "#64748b",

                    fontSize: 19,

                    zIndex: 1,

                    ...(hasStreak && {
                      animation:
                        "streakPulse 1.8s ease-in-out infinite",
                    }),

                    "@keyframes streakPulse": {
                      "0%, 100%": {
                        transform: "scale(1)",
                      },

                      "50%": {
                        transform: "scale(1.12)",
                      },
                    },
                  }}
                />
              </Box>

              {/* DESKTOP STREAK TEXT */}

              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.57rem",

                    color:
                      "rgba(255,255,255,0.4)",

                    textTransform: "uppercase",

                    letterSpacing: "1px",

                    lineHeight: 1,

                    mb: 0.45,
                  }}
                >
                  {hasStreak
                    ? "Current streak"
                    : "No active streak"}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.9rem",

                    fontWeight: 900,

                    color: "#fff",

                    lineHeight: 1,
                  }}
                >
                  {streak}

                  <Box
                    component="span"
                    sx={{
                      ml: 0.5,

                      color: hasStreak
                        ? "#fb923c"
                        : "#64748b",

                      fontWeight: 600,

                      fontSize: "0.7rem",
                    }}
                  >
                    {streak === 1
                      ? "day"
                      : "days"}
                  </Box>
                </Typography>
              </Box>

              {/* MOBILE */}

              <Typography
                sx={{
                  display: {
                    xs: "block",
                    sm: "none",
                  },

                  color: hasStreak
                    ? "#fff"
                    : "#94a3b8",

                  fontSize: "0.78rem",

                  fontWeight: 900,
                }}
              >
                {streak}
              </Typography>
            </Box>
          </Tooltip>

          {/* =================================================
              NOTIFICATION
          ================================================= */}

          <Tooltip title="Notifications" arrow>
            <IconButton
              sx={{
                width: {
                  xs: 38,
                  sm: 41,
                },

                height: {
                  xs: 38,
                  sm: 41,
                },

                color:
                  "rgba(255,255,255,0.58)",

                background:
                  "rgba(255,255,255,0.035)",

                border:
                  "1px solid rgba(255,255,255,0.07)",

                transition: "all 0.25s ease",

                "&:hover": {
                  color: "#fff",

                  background:
                    "rgba(255,255,255,0.08)",

                  borderColor:
                    "rgba(255,255,255,0.15)",

                  transform:
                    "translateY(-2px)",

                  boxShadow:
                    "0 8px 20px rgba(0,0,0,0.18)",
                },
              }}
            >
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* =================================================
              PROFILE
          ================================================= */}

          <Tooltip title="Lyfta Profile" arrow>
            <Box
              component="a"
              href="https://lyfta.app/profile/user/6hp0d"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",

                gap: 0.3,

                px: 0.25,
                py: 0.25,

                borderRadius: "15px",

                border:
                  "1px solid rgba(255,255,255,0.07)",

                background:
                  "rgba(255,255,255,0.025)",

                transition: "all 0.25s ease",

                cursor: "pointer",

                "&:hover": {
                  background:
                    "rgba(255,255,255,0.06)",

                  borderColor:
                    "rgba(34,197,94,0.25)",

                  transform: "translateY(-2px)",
                },
              }}
            >
<Avatar
  alt="Lyfta Profile"
  src="https://cdnlyfta.com/images/original/profilePic_68e7b22fd70108.603438566775.jpg"
  sx={{
    width: {
      xs: 36,
      sm: 50,
    },

    height: {
      xs: 36,
      sm: 50,
    },

    borderRadius: "120px",

    border: "2px solid rgba(255,255,255,0.12)",

    boxShadow: "0 6px 20px rgba(34,197,94,0.2)",

    transition: "all 0.25s ease",

    "& img": {
      objectFit: "cover",
      objectPosition: "center 9%",
    },

    "&:hover": {
      boxShadow: "0 8px 28px rgba(34,197,94,0.3)",
    },
  }}
/>

              {/* Hide on mobile */}

              <KeyboardArrowDownIcon
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },

                  fontSize: 17,

                  color:
                    "rgba(255,255,255,0.35)",

                  mr: 0.3,
                }}
              />
            </Box>
          </Tooltip>

          {/* =================================================
              ACHIEVEMENTS
          ================================================= */}

          <Tooltip
            title="Workout achievements"
            arrow
          >
            <IconButton
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },

                width: 41,
                height: 41,

                color: "#facc15",

                background:
                  "rgba(250,204,21,0.05)",

                border:
                  "1px solid rgba(250,204,21,0.1)",

                transition: "all 0.25s ease",

                "&:hover": {
                  background:
                    "rgba(250,204,21,0.11)",

                  borderColor:
                    "rgba(250,204,21,0.22)",

                  transform:
                    "translateY(-2px) rotate(3deg)",

                  boxShadow:
                    "0 8px 22px rgba(250,204,21,0.12)",
                },
              }}
            >
              <EmojiEventsOutlinedIcon
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}