"use client";
import { useEffect, useReducer, useState } from "react";
import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import { useBackground } from "@/context/BackGroundImg/BackGroundIMGContext";
import { loginInitialState, loginReducer } from "../authReducers";
import { boxStyle, authStyle } from "@/app/pageStyles";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import SnakeBarComponent from "@/reusableComponents/SnakeBarComponent";
import { loginStart } from "@/redux/slice/auth/authSlice";
export default function Login() {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);
  const { setBackgroundIMGUrl } = useBackground();
  const [snakeBarMSG, setSnakeBarMSG] = useState<string>("");
  const [isSnakeBarOpen, setIsSnakeBarOpen] = useState<boolean>(false);
  const _dispatch = useDispatch();
  const [severity, setSeverity] = useState<AlertColor>("success");
  const { loading, user, error, message } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  useEffect(() => {
    console.log("loading", loading);
    console.log("loading", user);
    console.log("loading", error);

    if (error != null) {
      setSnakeBarMSG(error);
      setSeverity("error");
      setIsSnakeBarOpen(true);
    } else if (user && !loading) {
      setSnakeBarMSG(message as string);
      setSeverity("success");
      setIsSnakeBarOpen(true);
      router.push("/");
    }
  }, [error, loading, user, message, router]);
  const handleClose = () => {
    setIsSnakeBarOpen(false);
  };

  console.log("hiii");
  useEffect(() => {
    setBackgroundIMGUrl(
      "/authBackgroundIMG/steve-carter-Ixp4YhCKZkI-unsplash.jpg"
    );
  }, [setBackgroundIMGUrl]);
  const handleLogin = () => {
    _dispatch(loginStart({ email: state.email, password: state.password }));
    dispatch({ type: "RESET" });
  };
  return (
    <>
      <Box sx={boxStyle}>
        <Box sx={authStyle}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Login Account
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              autoComplete="off"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Hover border
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Focus border
                  },
                },
                input: { color: "white" }, // Optional: white text color
                label: { color: "white" }, // Optional: white label
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                input: { color: "white" },
                label: { color: "white" },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ width: "40%", ml: "auto", mr: "auto" }}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Don&apos;t have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: "#1976d2",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
                onClick={() => {
                  router.push("/auth/register");
                }}
              >
                Register
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      <SnakeBarComponent
        isSnakeBarOpen={isSnakeBarOpen}
        snakeBarMSG={snakeBarMSG}
        severity={severity}
        handleClose={handleClose}
      ></SnakeBarComponent>
    </>
  );
}
