import { Box, LinearProgress } from "@mui/material";

export function Loading() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}
