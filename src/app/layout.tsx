import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";


const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans"
});


export const metadata: Metadata = {
  title: "Dashboard project",
  description: "dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${fontSans.variable}`}>
      <body
        className={cn(
          "min-h-screen  m-auto bg-background font-sans antialiased",
          fontSans.variable
        )
        }
      >
        {children}
      </body>
    </html>
  );
}
