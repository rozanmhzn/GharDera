"use client";
import "../app/globals.css";
import "@mantine/core/styles.css";

import Navbar from "@/components/partials/Navbar";
import { MantineProvider } from "@mantine/core";
import { usePathname } from "next/navigation";
import Footer from "@/components/partials/Footer";
import "@mantine/carousel/styles.css";
export default function RootLayout({ children }) {
  const pathName = usePathname();
  const adminIndex = pathName.indexOf("/login");

  // Remove the base path from the full path
  const cleanedPath =
    adminIndex !== -1 ? pathName.substring(0, adminIndex + 6) : pathName;

  return (
    <html lang="en">
      <title>GharDera</title>
      <body>
        
        <MantineProvider>
          <div className="bg-white">
            {cleanedPath != "/login" &&
              cleanedPath != "/signup" &&
              cleanedPath != "/forgotpassword" &&
              cleanedPath != "/resetpassword" && <Navbar />}
            {/*main body */}
            {children}
            {cleanedPath != "/login" && cleanedPath != "/signup" && <Footer />}
          </div>
        </MantineProvider>
        
      </body>
    </html>
  );
}
