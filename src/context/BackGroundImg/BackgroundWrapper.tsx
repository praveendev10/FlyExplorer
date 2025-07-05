"use client";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { useBackground } from "./BackGroundIMGContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { backgroundUrl } = useBackground();
  const params = usePathname();
  const pathUrl = params === "/";

  const zoomIn = keyframes`
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
`;
  useEffect(() => {
    console.log("backgroundUrl", backgroundUrl);
  }, [backgroundUrl]);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Zooming background image layer */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: pathUrl ? null : 0.5,
          animation: pathUrl ? `${zoomIn} 15s ease-in-out forwards` : null,
          zIndex: 0,
          position: "relative", // Keep it relative instead of absolute
          "&::after": !pathUrl
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: 0.5,
              }
            : {},
        }}
      />
      {children}
    </Box>
  );
}
export default BackgroundWrapper;
