"use client";

import { useAppContext } from "@/context";
import { handleClientScriptLoad } from "next/script";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
export default function Signup() {
  const { lang, setLang } = useAppContext();
  const [ShowPwd, setShowPwd] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePage = () => {
    setCurrentPage(currentPage === 1 ? 2 : 1);
  };

  return (
    <div
      style={{ backgroundImage: "url('/images/h_page/bg_img.svg')" }}
      className="h-fit w-full bg-no-repeat bg-cover bg-center   px-4 pt-7 pb-40 sm:flex sm:justify-center sm:items-center"
    >
      <div
        className={`w-full bg-no-repeat bg-cover bg-top h-[280px] p-12  sm:p-4 drop-shadow-lg sm:max-w-[500px] ${
          currentPage == 1 ? "sm:h-[650px]" : "sm:h-[720px]"
        } z-[100] flex flex-col justify-center items-center relative`}
        style={{ backgroundImage: "url('/images/aut/insidecover.png')" }}
      >
        <div
          className={`w-full h-full z-[1000] bg-[rgba(255,255,255,0.3)]  backdrop-blur-sm flex flex-col justify-center items-center gap-5 sm:max-w-[440px] sm:h-[525px] ${
            currentPage == 1 ? "sm:h-[525px]" : "sm:h-[600px]"
          }`}
        >
          <img src="/images/aut/logo.svg" alt="" />
          <h1 className=" text-4xl text-white font-josefin font-medium">
            Your Notes
          </h1>
        </div>

        <button
          onClick={() => setLang(lang == "Ar" ? "En" : "Ar")}
          className="font-poppins text-3xl text-white font-bold cursor-pointer absolute bottom-1 left-2"
        >
          {lang}
        </button>
      </div>

      {currentPage == 1 && (
        <div className="w-full bg-white h-fit drop-shadow-2xl pb-7 sm:h-[650px] sm:max-w-[500px]">
          <div className="pt-[45px] text-center font-bold text-4xl text-primary">
            Signup
          </div>
          <form
            autoComplete="off"
            action=""
            className="flex flex-col px-3 space-y-5 "
          >
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
              <p className="text-2xl">Email</p>
              <input
                type="email"
                autoComplete="email"
                className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-md"
              />
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
              <p className="text-2xl">Password</p>
              <input
                type={ShowPwd ? "text" : "password"}
                name="new-password"
                autoComplete="new-password"
                className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!ShowPwd)}
                className="absolute bottom-4 right-2"
              >
                <img src="/images/aut/Vector.svg" alt="" />
              </button>
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 pb-7 relative ">
              <p className="text-2xl">Confirm password</p>
              <input
                type={ShowPwd ? "text" : "password"}
                name="confirm-password"
                autoComplete="new-password"
                className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!ShowPwd)}
                className="absolute bottom-10 right-2"
              >
                <img src="/images/aut/Vector.svg" alt="" />
              </button>
            </div>

            <button
              onClick={handlePage}
              type="button"
              className="w-full bg-primary text-white font-bold text-2xl py-3 rounded-lg flex justify-center gap-3 items-center drop-shadow-md"
            >
              Complete Signup <FaArrowRight />
            </button>
            <div className="space-y-3 flex flex-col justify-center pt-5">
              <p className="text-gray-500 text-2xl font-josefin text-center">
                Alrady have an account!
              </p>
              <button className="font-bold text-2xl text-primary pb-7">
                Login
              </button>
            </div>
          </form>
        </div>
      )}

      {currentPage == 2 && (
        <div className="w-full bg-white h-fit drop-shadow-2xl pb-7 sm:h-[720px] sm:max-w-[500px]">
          <div className="pt-[45px] text-center font-bold text-4xl text-primary">
            Complete Signup
          </div>
          <form
            autoComplete="off"
            action=""
            className="flex flex-col px-3 space-y-5 "
          >
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
              <p className="text-xl pt-4">username</p>
              <input
                type="text"
                autoComplete="off"
                className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
              <p className="text-xl">phone</p>
              <input
                type="text"
                name="phone"
                className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white"
              />
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 pb-7 relative ">
              <p className="text-xl">Birthday Year</p>
              <input
                type="text"
                name="birthday year"
                className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white"
              />
            </div>

            <button className="w-full bg-primary text-white font-bold text-2xl py-3 rounded-lg flex justify-center gap-3 items-center drop-shadow-md">
              Complete Signup <FaArrowRight />
            </button>
            <button
              className="w-full bg-gray-500 text-white font-bold text-2xl py-3 rounded-lg flex justify-center gap-5 items-center drop-shadow-md"
              type="button"
              onClick={handlePage}
            >
              <p>Back</p> <FaArrowLeft />
            </button>
            <div className="space-y-3 flex space-x-2 justify-center pt-5">
              <p className="text-gray-500 text-xl font-josefin text-center">
                Alrady have an account!
              </p>
              <button className="font-bold text-xl text-primary pb-10">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
