"use client";
import { useRouter } from 'next/navigation'
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useState } from "react";
import { useAppContext } from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const {lang,setLang} = useAppContext()
  const {theme,setTheme} = useAppContext()
  const router = useRouter()
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
          <img src="/images/h_page/logo-pink.svg" alt="logo" />
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
                theme === "Dark"
                  ? "/images/h_page/light.svg"
                  : "/images/h_page/dark.svg"
              }
              alt="dark mode toggle"
            />
          </button>
          <button onClick={handleUser}>
            <img src="/images/h_page/user.svg" alt="user profile" />
          </button>
        </div>
        {isUserOpen && (
          <div
            className=" w-full min-h-screen bg-[rgba(0,0,0,0.8)]   absolute top-[63px] space-y-3   flex flex-col justify-center items-center z-[1000] 
          sm:w-[300px] sm:h-fit sm:rounded-2xl sm:bg-white sm:top-[65px] sm:right-[20px] sm:px-3 sm:py-3 sm:space-y-1 sm:min-h-0
          "
          >
            <p className=" font-bold text-primary text-2xl pb-5 text-left sm:pl-2 sm:pb-8  sm:mb-auto">
              hi mohammed
            </p>
            <button
            onClick={() => router.push('/homepage/modify')}
             className="bg-[#7C8495] text-2xl py-4 px-6 rounded-md w-[321px] font-medium sm:py-3 sm:px-2 sm:w-full  text-white">
              Modify user info
            </button>
            <button className="bg-primary  text-white text-2xl py-4 px-6 rounded-md w-[321px] font-medium sm:w-full sm:py-3 sm:px-2 ">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* sm:w-[200px] sm:h-fit sm:rounded-2xl sm:bg-white sm:top-[65px] sm:right-[20px] sm:px-3 sm:py-3 sm:space-y-1 */}

      <main>{children}</main>
    </div>
  );
}
