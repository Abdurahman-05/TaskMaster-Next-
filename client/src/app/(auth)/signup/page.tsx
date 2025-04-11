import React from "react";
import { FaArrowRight } from "react-icons/fa";
export default function Signup() {
  return (
    <div
      style={{ backgroundImage: "url('/images/h_page/bg_img.svg')" }}
      className="h-fit w-full bg-no-repeat bg-cover bg-center  px-4 pt-7 pb-40"
    >
      <div
        className="w-full bg-no-repeat bg-cover bg-top h-[280px] p-3 drop-shadow-lg"
        style={{ backgroundImage: "url('/images/aut/insidecover.png')" }}
      >
        <div className="w-full h-full z-[1000] bg-[rgba(255,255,255,0.3)]  backdrop-blur-sm flex flex-col justify-center items-center gap-5">
          <img src="/images/aut/logo.svg" alt="" />
          <h1 className=" text-4xl text-white font-josefin font-medium">
            Your Notes
          </h1>
        </div>
      </div>

      <div className="w-full bg-white h-fit drop-shadow-2xl pb-7">
        <div className="pt-[45px] text-center font-bold text-4xl text-primary">
          Signup
        </div>
        <form action="" className="flex flex-col px-3 space-y-5 ">
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
            <p className="text-2xl">Email</p>
            <input
              type="email"
              className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-md"
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
            <p className="text-2xl">Password</p>
            <input
              type="password"
              className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white"
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 pb-7 ">
            <p className="text-2xl">Confirm password</p>
            <input
              type="password"
              className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white"
            />
          </div>

          <button className="w-full bg-primary text-white font-bold text-2xl py-3 rounded-lg flex justify-center gap-3 items-center drop-shadow-md">
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
    </div>
  );
}
