"use client"
import { createContext, useContext } from "react";

interface BackgroundImgContextType {
  backgroundUrl: string;
  setBackgroundIMGUrl: (url: string) => void;
}
const createIMGContext = createContext<BackgroundImgContextType | null>(null);

export const useBackground = (): BackgroundImgContextType => {
  const context = useContext(createIMGContext);
  if (!context)
    throw new Error("useBackground must be used inside BackgroundProvider");
  return context;
};
export default createIMGContext;
