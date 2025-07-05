"use client";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Popover,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import FlightIcon from "@mui/icons-material/Flight";

import { useBackground } from "@/context/BackGroundImg/BackGroundIMGContext";
import dayjs, { Dayjs } from "dayjs";
type PassengerCategory = "Adults" | "Children" | "Infants";
type Operation = "Increment" | "Decrement";
export default function FlightSearch() {
  const { setBackgroundIMGUrl } = useBackground();
  const [loading, setLoading] = useState(false);
  const [textColor, setTextColor] = useState({ textColor: "" });
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Your access token:", token);
  } else {
    console.log("No token found — user might be logged out.");
  }
  const [openStart, setOpenStart] = useState(false);
  const [anchorStart, setAnchorStart] = useState<HTMLElement | null>(null);
  const [openPassengers, setopenPassengers] = useState(false);
  const [pasengerAnchor, setPasengerAnchor] = useState<HTMLElement | null>(
    null
  );

  const [selected, setSelected] = useState("One Way");
  const [passengerType, setPasengersType] = useState<
    Record<PassengerCategory, number>
  >({
    Adults: 0,
    Children: 0,
    Infants: 0,
  });

  const [passengerTot, setPasengersTot] = useState(0);
  const [openEnd, setOpenEnd] = useState(false);
  const [anchorEnd, setAnchorEnd] = useState<HTMLElement | null>(null);
  const [roundTripDate, setRoundTripDate] = useState<Dayjs | null>(null);
  const handleOpenStart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorStart(event.currentTarget as HTMLElement);
    setOpenStart(true);
  };
  const handleCloseStart = () => {
    setOpenStart(false);
  };

  const handleOpenEnd = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEnd(event.currentTarget as HTMLElement);
    setOpenEnd(true);
  };

  const handleCloseEnd = () => {
    setOpenEnd(false);
  };

  const handleOpenPassenger = (event: React.MouseEvent<HTMLElement>) => {
    setPasengerAnchor(event.currentTarget as HTMLElement);
    setopenPassengers(true);
  };
  const today = new Date();
  const twoMonthsLater = new Date(today);
  const maxDate = twoMonthsLater.setMonth(today.getMonth() + 2);
  //const open = Boolean(anchorEl);
  const hour = new Date().getHours();
  useEffect(() => {
    const getTimeBasedGradient = () => {
      if (hour >= 5 && hour < 12)
        return {
          textColor: "#2b2b2b", // soft dark
        };
      else if (hour >= 12 && hour < 17)
        return {
          textColor: "#2a1b0a", // elegant deep brown
        };
      else if (hour >= 17 && hour < 20)
        return {
          textColor: "#2e2e2e", // neutral dark
        };
      else
        return {
          textColor: "#f0f0f0", // almost white
        };
    };
    setTextColor(getTimeBasedGradient());
  }, [hour]);
  const handleClosePassenger = () => {
    setPasengerAnchor(null);
    setopenPassengers(false);
  };
  const handlePassengerChange = (
    type: PassengerCategory,
    operation: Operation
  ) => {
    setPasengersType((prev) => ({
      ...prev,
      [type]:
        operation === "Increment"
          ? prev[type] + 1
          : Math.max(0, prev[type] - 1),
    }));
  };
  const totalPassengers = useMemo(
    () => Object.values(passengerType).reduce((a, b) => a + b, 0),
    [passengerType]
  );
  useEffect(() => {
    setBackgroundIMGUrl("/backgroundIMG/jeshoots-com-mSESwdMZr-A-unsplash.jpg");
  }, []);
  const buttons = ["One Way", "Round Trip", "Multiple Destination"];
  return (
    <>
      <Box
        sx={{
          //mb: 22,
          color: `${textColor.textColor}`,
          width: "90%",

          position: "absolute",
          top: 0,
          left: 130,
          right: 0,
          height: "100%",
          display: "flex",
          alignItems: "flex-start", // 👈 aligns content to the left
          flexDirection: "column",
          justifyContent: "center", // 👈 still vertically centers it
          zIndex: 1,
          px: 4, // 👈 optional padding from the left
        }}
      >
        <Box
          sx={{ display: "flex", textAlign: "left", flexDirection: "column" }}
        >
          <Typography variant="h3" component="p" sx={{ letterSpacing: "1px" }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Go
            </Box>{" "}
            <Box component="span">Tour</Box>
          </Typography>
          <Typography variant="h3" component="p" sx={{ letterSpacing: "1px" }}>
            <Box component="span">with</Box>{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              RabitBooking
            </Box>
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: "18px",
              WebkitFontSmoothing: "antialiased",
              letterSpacing: "1.5px",
              color: "gray",
              pt: 2,
            }}
          >
            Visit Europes, America, Asia, Africa or beyond!
          </Typography>
          <Box sx={{ pt: 4, letterSpacing: "1px", gap: 1, display: "flex" }}>
            {buttons.map((label) => (
              <Box
                key={label}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  "&::after":
                    selected === label
                      ? {
                          content: '""',

                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          borderWidth: "8px",
                          borderStyle: "solid",
                          borderColor:
                            "#212a42 transparent transparent transparent",
                        }
                      : {},
                }}
              >
                <Button
                  onClick={() => setSelected(label)}
                  disabled={label === "Multiple Destination"}
                  sx={{
                    pl: 1.5,
                    pr: 1.5,
                    background: selected === label ? "#212a42" : "white",
                    color: selected === label ? "white" : "#212a42",

                    fontWeight: 500,
                    textTransform: "none",
                    position: "relative", // required for ::after
                    "&::after":
                      selected === label
                        ? {
                            content: '""',
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            borderWidth: "8px",
                            borderStyle: "solid",
                            background: "#21",
                            borderColor:
                              "#212a42 transparent transparent transparent", // dark blue arrow
                          }
                        : {},
                  }}
                >
                  {label}
                </Button>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              height: "90px",
              backgroundColor: "white",
              mt: 2,
              width: "fit-content",
              borderRadius: "5px",
              borderBottom: "3px solid rgb(84, 87, 247)",
              display: "inline-flex",

              alignItems: "center",
              justifyContent: "space-around",
              gap: 2, // optional spacing between children
              px: 2,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="From"
              sx={{
                backgroundColor: "#ebebf0",
                "& fieldset": {
                  border: "none", // remove the fieldset border (default outline)
                },
                "& .MuiInputBase-root": {
                  height: 38,
                  width: 170,
                },
                "& .MuiInputBase-input": {
                  fontSize: "16px", // input text
                },

                "& input": {
                  padding: "12px 14px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FlightIcon
                      titleAccess="Search Flight Icon"
                      style={{ width: 28, height: 28 }}
                    ></FlightIcon>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              placeholder="To"
              sx={{
                backgroundColor: "#ebebf0",

                "& fieldset": {
                  border: "none", // remove the fieldset border (default outline)
                },
                "& .MuiInputBase-root": {
                  height: 38,
                  width: 170,
                },
                "& .MuiInputBase-input": {
                  fontSize: "16px", // input text font size
                },
                "& input": {
                  padding: "12px 14px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FlightIcon
                      titleAccess="Search Flight Icon"
                      style={{
                        width: 28,
                        height: 28,
                        transform: "rotate(180deg)",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TextField
                value={selectedDate ? selectedDate.format("YYYY/MM/DD") : ""}
                onClick={handleOpenStart}
                placeholder="YYYY/MM/DD"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleOpenStart}
                        edge="end"
                        sx={{
                          padding: "8px",
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <CalendarTodayIcon
                          sx={{
                            width: 20,
                            height: 20,
                            color: "#777",
                            "&:hover": { color: "#555" },
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#ebebf0",
                  width: 200,
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    height: 40, // Slightly reduced for better proportions

                    "& fieldset": {
                      border: "none",
                      borderRadius: "5px",
                    },
                    "&:hover fieldset": {
                      border: "none",
                      // Slightly darker on hover
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    padding: "10px 14px",
                    cursor: "pointer",
                    "&::placeholder": {
                      color: "#999",
                      opacity: 1,
                    },
                  },
                }}
              />

              <Popover
                open={openStart}
                anchorEl={anchorStart}
                onClose={handleCloseStart}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: -1, // adds top margin
                      height: "310px",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                      overflow: "hidden",
                    },
                  },
                }}
              >
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedDate}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onChange={(value, _context) => {
                    if (value) {
                      setSelectedDate(value as Dayjs);
                      setRoundTripDate(value as Dayjs);
                      handleCloseStart();
                    }
                  }}
                  minDate={dayjs()}
                  maxDate={dayjs().add(1, "month")}
                  onAccept={handleCloseStart}
                  onClose={handleCloseStart}
                  slotProps={{
                    actionBar: { actions: [] }, // removes OK, Cancel, Today
                  }}
                  sx={{
                    mb: 1.5,
                    "& .MuiPickersDay-root": {
                      "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.1)" },
                      "&.Mui-selected": {
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#1565c0" },
                      },
                    },
                    "& .MuiTypography-caption": {
                      color: "#666",
                      fontWeight: 500,
                    },
                    "& .MuiPickersCalendarHeader-label": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Popover>
            </LocalizationProvider>
            {selected === "Round Trip" && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  value={
                    roundTripDate
                      ? format(roundTripDate.toDate(), "yyyy/MM/dd")
                      : ""
                  }
                  onClick={handleOpenEnd}
                  placeholder="YYYY/MM/DD"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleOpenEnd}
                          edge="end"
                          sx={{
                            padding: "8px",
                            "&:hover": { backgroundColor: "transparent" },
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{
                              width: 20,
                              height: 20,
                              color: "#777",
                              "&:hover": { color: "#555" },
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#ebebf0",
                    width: 200,
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: 40, // Slightly reduced for better proportions

                      "& fieldset": {
                        border: "none",
                        borderRadius: "5px",
                      },
                      "&:hover fieldset": {
                        border: "none",
                        // Slightly darker on hover
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                      padding: "10px 14px",
                      cursor: "pointer",
                      "&::placeholder": {
                        color: "#999",
                        opacity: 1,
                      },
                    },
                  }}
                />

                <Popover
                  open={openEnd}
                  anchorEl={anchorEnd}
                  onClose={handleCloseEnd}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: -1, // adds top margin
                        height: "310px",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                        overflow: "hidden",
                      },
                    },
                  }}
                >
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    value={roundTripDate}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onChange={(value, _context) => {
                      if (value) {
                        setRoundTripDate(value as Dayjs);
                        handleCloseEnd();
                      }
                    }}
                    minDate={selectedDate ?? dayjs()} // ✅ this is correct
                    maxDate={
                      selectedDate
                        ? selectedDate.add(2, "month")
                        : dayjs().add(2, "month")
                    } // ✅ also correct
                    onAccept={handleCloseEnd}
                    onClose={handleCloseEnd}
                    slotProps={{
                      actionBar: {
                        actions: [],
                      },
                    }}
                    sx={{
                      mb: 1.5,
                      "& .MuiPickersDay-root": {
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#1976d2",
                          "&:hover": {
                            backgroundColor: "#1565c0",
                          },
                        },
                      },
                      "& .MuiTypography-caption": {
                        color: "#666",
                        fontWeight: 500,
                      },
                      "& .MuiPickersCalendarHeader-label": {
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                </Popover>
              </LocalizationProvider>
            )}

            <TextField
              variant="outlined"
              placeholder="Passengers"
              value={
                totalPassengers === 0 ? "" : `${totalPassengers} Passengers`
              }
              onClick={handleOpenPassenger}
              sx={{
                backgroundColor: "#ebebf0",
                borderRadius: "5px",
                "& fieldset": {
                  border: "none", // remove the fieldset border (default outline)
                },
                "& .MuiInputBase-root": {
                  height: 38,
                  width: 170,
                },
                "& .MuiInputBase-input": {
                  fontSize: "16px", // input text font size
                  cursor: "pointer",
                },
                "& input": {
                  padding: "12px 14px",
                },
                "&:hover": {},
              }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Person2Icon style={{ width: 28, height: 28 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Popover
              open={openPassengers}
              anchorEl={pasengerAnchor}
              onClose={handleClosePassenger}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: -1,

                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                    overflow: "hidden",
                    px: 2,
                    py: 1,
                  },
                },
              }}
            >
              <Box sx={{}}>
                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <PersonIcon sx={{ color: "#757575", mr: 1 }} />{" "}
                  <Typography component="p" sx={{ display: "flex", width: 55 }}>
                    Adult:
                  </Typography>
                  {"   "}
                  <ControlPointIcon
                    sx={{ color: "green" }}
                    onClick={() => handlePassengerChange("Adults", "Increment")}
                  />
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ width: 30, textAlign: "center" }}
                  >
                    {passengerType.Adults}
                  </Typography>
                  <RemoveCircleOutlineIcon
                    sx={{ color: "red" }}
                    onClick={() => handlePassengerChange("Adults", "Decrement")}
                  />
                </Typography>
                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <ChildCareIcon sx={{ color: "#757575", mr: 1 }} />{" "}
                  <Typography component="p" sx={{ display: "flex", width: 55 }}>
                    Child:
                  </Typography>
                  {"   "}
                  <ControlPointIcon
                    sx={{ color: "green" }}
                    onClick={() =>
                      handlePassengerChange("Children", "Increment")
                    }
                  />{" "}
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ width: 30, textAlign: "center" }}
                  >
                    {passengerType.Children}
                  </Typography>
                  <RemoveCircleOutlineIcon
                    sx={{ color: "red" }}
                    onClick={() =>
                      handlePassengerChange("Children", "Decrement")
                    }
                  />
                </Typography>
                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <BabyChangingStationIcon sx={{ color: "#757575", mr: 1 }} />{" "}
                  <Typography component="p" sx={{ display: "flex", width: 55 }}>
                    Infants:
                  </Typography>
                  {"   "}
                  <ControlPointIcon
                    sx={{ color: "green" }}
                    onClick={() =>
                      handlePassengerChange("Infants", "Increment")
                    }
                  />
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ width: 30, textAlign: "center" }}
                  >
                    {passengerType.Infants}
                  </Typography>
                  <RemoveCircleOutlineIcon
                    sx={{ color: "red" }}
                    onClick={() =>
                      handlePassengerChange("Infants", "Decrement")
                    }
                  />
                </Typography>
              </Box>
            </Popover>
            <Button
              sx={{
                backgroundColor: "#4b6ef2",
                borderRadius: "5px",
                minWidth: "40px",
                "&:hover": { backgroundColor: "#3458e0" },
              }}
            >
              <SearchSharpIcon sx={{ color: "white", fontSize: "25px" }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
