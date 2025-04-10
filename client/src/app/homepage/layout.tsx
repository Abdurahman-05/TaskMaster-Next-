"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>("Ar");
  const [theme, setTheme] = useState<string>("Light");
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);

  const handleLang = () => {
    setLang(lang === "Ar" ? "En" : "Ar");
  };
  const handleTheme = () => {
    setTheme(theme === "Light" ? "Dark" : "Light");
  };
  const handleUser = () => {
    setIsUserOpen((prev) => !prev);
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
     
        <nav className="h-[62px] w-full flex items-center relative">
          <div className="ml-5">
            <img src="/images/logo-pink.svg" alt="logo" />
          </div>
          <h1 className="mr-auto ml-2 text-2xl text-primary">Your Notes</h1>
          <div className="flex space-x-4 mr-6">
            <button
              onClick={handleLang}
              className="font-poppins text-3xl text-primary font-bold cursor-pointer"
            >
              {lang}
            </button>
            <button onClick={handleTheme}>
              <img
                src={
                  theme === "Dark" ? "/images/light.svg" : "/images/dark.svg"
                }
                alt="dark mode toggle"
              />
            </button>
            <button onClick={handleUser}>
              <img src="/images/user.svg" alt="user profile" />
            </button>
          </div>
        {isUserOpen && (
          <div className="absolute w-[200px] h-fit rounded-2xl bg-white top-[65px] right-[20px] px-3 py-3 space-y-1 flex flex-col ">
            <p className="mb-auto text-left pl-2 pb-8">hi mohammed</p>
            <button className="bg-secondery py-4 px-6 rounded-md w-full  text-white">Modify user info</button>
            <button className="bg-primary py-2 px-4 rounded-md w-full text-white">Logout</button>
          </div>
        )}
        </nav>

      

      <main>{children}</main>
    </div>
  );
}
