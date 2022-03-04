import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/kanade-k-1228">
        Kanade
      </Link>
      {" 2022."}
    </Typography>
  );
}
