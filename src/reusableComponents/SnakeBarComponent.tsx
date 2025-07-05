import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface SnakeBarComponentProps {
  isSnakeBarOpen: boolean;
  snakeBarMSG: string;
  severity: AlertColor; // 👈 required now
  handleClose: () => void;
}

const SnakeBarComponent: React.FC<SnakeBarComponentProps> = ({
  isSnakeBarOpen,
  snakeBarMSG,
  severity,
  handleClose,
}) => {
  return (
    <Snackbar
      open={isSnakeBarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity} // 👈 dynamic
        sx={{
          width: "100%",
          color: "white",
          backgroundColor:
            severity === "success"
              ? "#4caf50"
              : severity === "error"
              ? "#f44336"
              : "#2196f3",
        }}
      >
        {snakeBarMSG}
      </Alert>
    </Snackbar>
  );
};

export default SnakeBarComponent;
