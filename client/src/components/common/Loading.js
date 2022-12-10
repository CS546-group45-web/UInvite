import { CircularProgress } from "@mui/material";
import React from "react";

function Loading({ loading, width = 16, thickness = 4 }) {
  return (
    loading && (
      <CircularProgress
        size={width}
        thickness={thickness}
        sx={{
          color: "#fff",
          marginRight: "8px",
        }}
      />
    )
  );
}

export default Loading;
