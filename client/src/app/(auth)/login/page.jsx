"use client";

import { useAppContext } from "@/context";
import { handleClientScriptLoad } from "next/script";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { resolve } from "path";
import Loading from "@/app/loading";
import Alert from "@/components/CustomAlert";
// import LoadingSpinner from '../../../components/LoadingSpinner.js';

export default function Login() {
  const router = useRouter();

  const { lang, handleLang } = useAppContext();
  const [ShowPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://taskmaster-next-ryfm.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data, res);

      if (!res.ok) {
        data.error;
        setAlert({ type: "error", message: "check your connection!!!" });
        return;
      } else {
        setAlert({ type: "success", message: "User logged successfully!!!" });
        localStorage.setItem("accessToken", data.accessToken);
        // setLoading(false);
        router.push("/homepage");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('/images/h_page/bg_img.svg')" }}
      className={`h-fit w-full bg-no-repeat bg-cover bg-center ${
        lang == "En" ? "flex flex-col sm:flex-row-reverse" : ""
      }  px-4 pt-7 pb-40 sm:flex sm:justify-center sm:items-center`}
    >
      {alert.message && <Alert type={alert.type} message={alert.message} />}
      <div
        className={`w-full bg-no-repeat bg-cover bg-top h-[280px] p-12  sm:p-4 drop-shadow-lg sm:max-w-[500px]  sm:h-[550px]
        z-[100] flex flex-col- justify-center items-center relative`}
        style={{ backgroundImage: "url('/images/aut/insidecover.png')" }}
      >
        <div
          className={`w-full h-full z-[1000] bg-[rgba(255,255,255,0.3)]  backdrop-blur-sm flex flex-col justify-center items-center gap-5 sm:max-w-[430px] sm:h-[460px] `}
        >
          <img src="/images/aut/logo.svg" alt="" />
          <h1 className=" text-4xl text-white font-josefin font-medium">
            Your Notes
          </h1>
        </div>

        <button
          onClick={handleLang}
          className={`font-poppins text-3xl text-white font-bold cursor-pointer absolute ${
            lang == "Ar" ? "bottom-1 left-2" : "bottom-1 right-2"
          }`}
        >
          {lang}
        </button>
      </div>

      <div className="w-full bg-white h-fit drop-shadow-2xl pb-7 sm:h-[550px] sm:max-w-[500px]">
        <div className="pt-[45px] pb-6 text-center font-bold text-4xl text-primary">
          {lang == "En" ? "تسجيل دخول" : "Login"}
        </div>
        <form
          autoComplete="off"
          action=""
          className="flex flex-col px-3 space-y-5 "
        >
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
            <p
              className={`text-2xl ${
                lang == "En" ? "text-right" : "text-left"
              }`}
            >
              {lang == "En" ? "الحساب" : "Email"}
            </p>
            <input
              type="email"
              autoComplete="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-md ${
                lang == "En" ? "text-right pr-4" : "text-left"
              }`}
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
            <p
              className={`text-2xl ${
                lang == "En" ? "text-right" : "text-left"
              }`}
            >
              {lang == "En" ? "الرقم السري" : "password"}
            </p>
            <input
              type={ShowPwd ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={formData.password}
              autoComplete="new-password"
              className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white   ${
                lang == "En" ? "text-right pr-4" : "text-left"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPwd(!ShowPwd)}
              className={`absolute ${
                lang == "Ar" ? "bottom-4 right-2" : "bottom-4 left-2"
              }`}
            >
              <img src="/images/aut/Vector.svg" alt="" />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full h-12 bg-primary text-white font-bold text-2xl py-3 rounded-lg flex justify-center gap-3 items-center drop-shadow-md"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>
            ) : lang === "Ar" ? (
              "Login"
            ) : (
              "تسجيل دخول"
            )}
          </button>

          <div
            className={`flex justify-center  items-center pt-5 space-x-4 ${
              lang == "En" ? "flex-row-reverse " : ""
            }`}
          >
            <p
              className="  text-gray-500 text-2xl font-josefin text-center
 ml-3"
            >
              {lang == "En" ? "تمتلك حساب بالفعل!" : " don't have an account!"}
            </p>
            <button
              type="button"
              className="font-bold text-[24px] sm:text-xl text-primary "
              onClick={() => router.push("/signup")}
            >
              {lang == "En" ? "تسجيل الدخول" : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
