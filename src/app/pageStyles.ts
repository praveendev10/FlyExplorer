
import { Theme, SxProps } from "@mui/material";
export const boxStyle: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  zIndex: 1,
  color: "white",
};
export const authStyle: SxProps<Theme> = {
  p: 3,
  backgroundColor: "black",
  opacity: 0.5,
  color: "white",
  borderRadius: "5px",
  mt: 1,
  width: "35%",
};
