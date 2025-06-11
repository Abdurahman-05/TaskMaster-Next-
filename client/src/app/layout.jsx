"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation events
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/context";
 // Import the spinner component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWrapper>
          {children}
        </AppWrapper>
        
      </body>
    </html>
  );
}
