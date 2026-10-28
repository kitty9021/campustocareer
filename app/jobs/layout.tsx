import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/app/components/ThemeToggle";

export const metadata: Metadata = {
  title: "CampusToCareer",
  description: "Find jobs and internships made for students and freshers.",
};

const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}