import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/LandingComps/Navbar";
import Footer from "@/components/LandingComps/Footer";
import ChatBotWidget from "./chatbot/ChatBotWidget";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nurture Childcare",
  description: "Nurture childcare and education service.",
  icons: {
    icon: "/favicon.png", // path in the public/ directory
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ChatBotWidget />
        <Footer />
      </body>
    </html>
  );
}
