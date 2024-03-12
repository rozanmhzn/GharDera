"use client";

import "../app/globals.css";
import "@mantine/core/styles.css";


// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };


import { MantineProvider } from "@mantine/core";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header 
        <Header/> */}
        <MantineProvider>
          {/* {cleanedPath != "/login" && cleanedPath != "/signup" && <Navbar />} */}
          {/*main body */}
          {children}
        </MantineProvider>

        {/* Footer 
        <Footer/> */}
      </body>
    </html>
  );
}
