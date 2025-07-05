// src/app/page.tsx
"use client";
import { useBackground } from "@/context/BackGroundImg/BackGroundIMGContext";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { boxStyle } from "./pageStyles";

export default function HomePage() {
  const { setBackgroundIMGUrl } = useBackground();

  useEffect(() => {
    setBackgroundIMGUrl("/backgroundIMG/luca-bravo-O453M2Liufs-unsplash.jpg");
  });
  return (
    <Box sx={boxStyle}>
      <Typography variant="h3" fontWeight="bold">
        Welcome to RapidBooking
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Book Flights, Hotels & More
      </Typography>
      <Button variant="outlined" sx={{ mt: 4, p: 1 }}>
        Start Now
      </Button>
    </Box>
  );
}
