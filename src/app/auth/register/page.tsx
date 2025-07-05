"use client";
import { useEffect, useReducer, useState } from "react";
import { useBackground } from "@/context/BackGroundImg/BackGroundIMGContext";
import {
  AlertColor,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import {
  registerStart,
  verifyOTPStart,
  resendOTPStart,
} from "@/redux/slice/auth/authSlice";
import dayjs from "dayjs";
import { Country } from "country-state-city";
import type { ICountry } from "country-state-city";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { authStyle, boxStyle } from "@/app/pageStyles";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { registerInitialState, registerReducer } from "../authReducers";
import CircularIndeterminate from "@/reusableComponents/CircularIndeterminate";
import SnakeBarComponent from "@/reusableComponents/SnakeBarComponent";
export default function Register() {
  const [state, dispatch] = useReducer(registerReducer, registerInitialState);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [snackbarMsg, setSnackbarMsg] = useState("Welcome!");
  const [open, setOpen] = useState(false);
  const _dispatch = useDispatch();
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [showOtpDialog, setShowOtpDialog] = useState<boolean>(false);
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
  const [otp, setOtp] = useState<string>("");
  const { loading, user, error, message } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  useEffect(() => {
    console.log("loading", loading);
    console.log("message", message);
    console.log("error", error);

    if (
      !loading &&
      !error &&
      message != null &&
      message != "Email verified and user created successfully!"
    ) {
      setShowOtpDialog(true);
    } else {
      console.log(showOtpDialog);

      setShowOtpDialog(false);
    }
    if (message === "Email verified and user created successfully!") {
      dispatch({ type: "RESET" });
      router.push("/auth/login");
    }
    if (message != null) {
      setSnackbarMsg(message);
      setSnackbarSeverity("success");
      setOpen(true);
    }
    if (error != null) {
      const [title, subText] = error.split(". ");
      console.log(title);
      if (title === "Invalid OTP") {
        console.log("Hiiii");
        setShowOtpDialog(true);
      }
      setSnackbarMsg(error);
      setSnackbarSeverity("error");
      setOpen(true);
    }
  }, [error, loading, message, router, showOtpDialog]);
  const { setBackgroundIMGUrl } = useBackground();
  useEffect(() => {
    setBackgroundIMGUrl(
      "/authBackgroundIMG/pascal-meier-UYiesSO4FiM-unsplash.jpg"
    );
  });
  const resendOTP = () => {
    _dispatch(resendOTPStart({ email: state.email }));
  };
  const handleSnackbarClose = () => {
    setOpen(false);
  };
  const verifyOTP = () => {
    if (otp) {
      _dispatch(
        verifyOTPStart({
          email: state.email,
          otp: otp,
        })
      );
    }
  };
  const handleRegister = () => {
    _dispatch(
      registerStart({
        username: state.username,
        email: state.email,
        password: state.password,
        gender: state.gender,
        dateofbirth: state.dateofbirth,
        country: state.country,
      })
    );
  };
  return (
    <>
      <Box sx={boxStyle}>
        <Box sx={authStyle}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Register Account
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="User Name"
              type="username"
              fullWidth
              autoComplete="off"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
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
              >
                <InputLabel id="gender-select-label" sx={{ color: "white" }}>
                  Gender
                </InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  value={state.gender}
                  label="Gender"
                  onChange={(e) =>
                    dispatch({ type: "SET_GENDER", payload: e.target.value })
                  }
                  sx={{ color: "white" }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              {/* Date Picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  maxDate={dayjs()}
                  label="Date of Birth"
                  onChange={(newValue) => {
                    if (newValue) {
                      dispatch({
                        type: "SET_DOB",
                        payload: dayjs(newValue).format("YYYY-MM-DD") as string, // e.g., "1999-03-29"
                      });
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputLabelProps: {
                        sx: { color: "white" }, // Label color
                      },
                      InputProps: {
                        sx: {
                          borderColor: "white",
                          color: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          svg: {
                            color: "white", // calendar icon
                          },
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>

              {/* Country Select */}
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>Country</InputLabel>
                <Select
                  value={state.country}
                  label="Country"
                  onChange={(e) =>
                    dispatch({ type: "SET_COUNTRY", payload: e.target.value })
                  }
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    svg: {
                      color: "white",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 150,
                      },
                    },
                  }}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.isoCode} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              sx={{ width: "40%", ml: "auto", mr: "auto" }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)", // Optional dim background
            zIndex: 1000,
          }}
        >
          <CircularIndeterminate />
        </Box>
      ) : (
        <Dialog open={showOtpDialog} onClose={() => setShowOtpDialog(false)}>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogContent>
            <TextField
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disabled={otp.length === 0}
              onClick={verifyOTP}
            >
              Verify OTP
            </Button>
            <Button
              variant="outlined"
              disabled={otp.length === 0}
              onClick={resendOTP}
            >
              Resend OTP
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <SnakeBarComponent
        isSnakeBarOpen={open}
        snakeBarMSG={snackbarMsg}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </>
  );
}
