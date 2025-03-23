"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

const customTheme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  colors: {
    primary: "#21271B",
    secondary: "#E4FDE1",
    background: "#515A47",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
