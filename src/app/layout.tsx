// src/app/layout.tsx
import "../styles/globals.css";
import { isValidElement, JSXElementConstructor, ReactNode } from "react";
import { Poppins } from "next/font/google";
import { BackgroundProvider } from "@/context/BackGroundImg/BackGroungIMGProvider";
import Header from "@/header/header";
import BackgroundWrapper from "@/context/BackGroundImg/BackgroundWrapper";
import { ThemeProviderWrapper } from "@/theme/themeWrapper";
import React from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Load fonts
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });
export const metadata = {
  title: "Travel App",
  description: "Book flights, hotels and cars",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  React.Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const type = child.type;
      if (typeof type === "function" || typeof type === "object") {
        const name = (type as JSXElementConstructor<unknown>).name;
        console.log("Component name:", name);
      } else if (typeof type === "string") {
        console.log("HTML element:", type); // e.g., "div"
      }
    }
  });

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ThemeProviderWrapper>
          <BackgroundProvider>
            <BackgroundWrapper>
              <Header />
              {children}
            </BackgroundWrapper>
          </BackgroundProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
