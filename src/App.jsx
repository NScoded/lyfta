import { Suspense, lazy } from "react";
import { CircularProgress, Box } from "@mui/material";

const Dashboard = lazy(() => import("./Dashboard"));

export default function App() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
