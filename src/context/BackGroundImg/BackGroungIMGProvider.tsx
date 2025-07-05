"use client"
import { ReactNode, useState } from "react";
import createIMGContext from "./BackGroundIMGContext";
export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundUrl, setBackgroundIMGUrl] = useState<string>("");

  return (
    <createIMGContext.Provider value={{ backgroundUrl, setBackgroundIMGUrl }}>
      {children}
    </createIMGContext.Provider>
  );
};
