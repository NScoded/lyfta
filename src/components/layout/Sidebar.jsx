import { Box, Typography } from "@mui/material";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        background: "#0b1220",
        color: "white",
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 4 }}>
        Lyfta
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ cursor: "pointer", "&:hover": { color: "#22c55e" } }}>
          Dashboard
        </Typography>
        <Typography sx={{ cursor: "pointer", "&:hover": { color: "#22c55e" } }}>
          Progress
        </Typography>
        <Typography sx={{ cursor: "pointer", "&:hover": { color: "#22c55e" } }}>
          Analytics
        </Typography>
      </Box>
    </Box>
  );
}
