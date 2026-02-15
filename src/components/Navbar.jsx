import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

export default function Navbar({ streak }) {
  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(11,18,32,0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Lyfta
        </Typography>

        {/* Premium Streak Badge */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 1,
            borderRadius: "50px",
            background:
              "linear-gradient(135deg, #ff6a00, #ff3d00)",
            boxShadow:
              "0 0 15px rgba(255, 90, 0, 0.6)",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <LocalFireDepartmentIcon
            sx={{
              color: "white",
              animation: "pulse 1.5s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.15)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          />

          <Typography
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: "0.9rem",
            }}
          >
            {streak} Day Streak
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
