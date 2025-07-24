"use client";

import { useAppContext } from "@/context";
import { handleClientScriptLoad } from "next/script";
import React, { useState,useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { stringify } from "querystring";
import toast, { Toaster } from 'react-hot-toast';

const defaultData = {
 email: "",
 password: "",
 rePassword: "",
 phone: "",
 username: "",
 dateOfBirth: "",
};

export default function Signup() {
  const router = useRouter();
  const { lang, handleLang } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [ShowPwd, setShowPwd] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);

  // On mount, load currentPage from localStorage (client only)
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  // Save currentPage when it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

   const [formData, setFormData] = useState(defaultData);

  // On mount, load formData from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(formData));
  }, [formData]);

  const handlePage = () => {
    if (formData.password !== formData.rePassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!formData.email || !formData.password || !formData.rePassword) {
      toast.error("pls fill the requirement!!!!!!!");
      return;
    }
    const userData = JSON.stringify(formData);
    localStorage.setItem("userData", userData);
    setCurrentPage((prevPage) => (prevPage === 1 ? 2 : 1));
  };

  const handleChange = (e) => {
  
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
     
    e.preventDefault();
    setLoading(true);
    
    try {
      localStorage.setItem("userData", JSON.stringify(formData));
      const userData = JSON.parse(localStorage.getItem("userData"));
      const res = await fetch(
        "https://taskmaster-next-ryfm.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData), // send formData to req.body
        }
      );

      const data = await res.json();
      if(formData.username == "" || formData.phone == ""){
      toast.error("pls fill the requirement!!!!!!!");
      return;
    }
      if (!res.ok) {
        toast.error(data.error);
        return;
      } else {
        toast.success("User registered successfully");
        setTimeout(() => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.removeItem('userData');
    localStorage.setItem('currentPage', 1);
    router.push("https://taskmaster-next-ryfm.onrender.com/homepage");
  }, 500);
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
      className={`h-fit w-full bg-no-repeat bg-cover bg-center   px-4 pt-7 pb-40 sm:flex sm:justify-center sm:items-center ${
        lang == "En" ? "flex flex-col sm:flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-full bg-no-repeat bg-cover bg-top h-[280px] p-12  sm:p-4 drop-shadow-lg sm:max-w-[500px] ${
          currentPage == 1 ? "sm:h-[570px]" : "sm:h-[610px]"
        } z-[100] flex flex-col justify-center items-center relative`}
        style={{ backgroundImage: "url('/images/aut/insidecover.png')" }}
      >
        <div
          className={`w-full h-full z-[1000] bg-[rgba(255,255,255,0.3)]  backdrop-blur-sm flex flex-col justify-center items-center gap-5 sm:max-w-[440px]  ${
            currentPage == 1 ? "sm:h-[450px]" : "sm:h-[480px]"
          }`}
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

      {currentPage == 1 && (
        <div className="w-full bg-white h-fit drop-shadow-2xl pb-7 sm:h-[570px] sm:max-w-[500px]">
          <div className="pt-[30px] text-center font-bold text-4xl text-primary">
            {lang == "En" ? "إنشاء حساب" : "Signup"}
          </div>
          <form
            autoComplete="off"
            action=""
            className="flex flex-col px-3 space-y-2 "
          >
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
              <p
                className={`text-2xl ${
                  lang == "En" ? "text-right" : "text-left "
                }`}
              >
                {lang == "En" ? "الحساب" : "Email"}
              </p>
              <input
                type="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
                required
                className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white  ${
                  lang == "En" ? "text-right  pr-3" : "text-left"
                } `}
              />
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
              <p
                className={`text-2xl ${
                  lang == "En" ? "text-right" : "text-left "
                }`}
              >
                {lang == "En" ? "الرقم السري" : "Password"}
              </p>

              <input
                type={ShowPwd ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                onChange={handleChange}
                value={formData.password}
                required
                className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white  ${
                  lang == "En" ? "text-right  pr-3" : "text-left"
                } `}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!ShowPwd)}
                className={`absolute ${
                  lang == "En" ? "bottom-4 left-2 pl-2" : "bottom-4 right-2"
                } `}
              >
                <img src="/images/aut/Vector.svg" alt="" />
              </button>
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 pb-4 relative ">
              <p
                className={`text-2xl ${
                  lang == "En" ? "text-right" : "text-left "
                }`}
              >
                {lang == "En" ? "تأكيد الرقم السري" : "Confirm password"}
              </p>
              <div
                className={`flex  flex-col ${
                  lang == "En" ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <input
                  type={ShowPwd ? "text" : "password"}
                  name="rePassword"
                  autoComplete="new-password"
                  value={formData.rePassword}
                  required
                  onChange={handleChange}
                  className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white  ${
                    lang == "En" ? "text-right  pr-3" : "text-left"
                  } `}
                />
               
              </div>
            </div>

            <button
              onClick={handlePage}
              type="button"
              className={`w-full bg-primary text-white font-bold text-2xl py-3 rounded-lg flex justify-center gap-3 items-center drop-shadow-md ${
                lang == "En" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <span>
                {lang == "En" ? "إكمال إنشاء الحساب" : "Complete Signup"}
              </span>
              {lang == "En" ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
            <div className="space-y-1 flex flex-col justify-center pt-2">
              <p className="text-gray-500 text-2xl font-josefin text-center">
                {lang == "En"
                  ? "تمتلك حساب بالفعل"
                  : " Alrady have an account!"}
              </p>
              <button
                className="font-bold text-2xl text-primary "
                type="button"
                onClick={() => router.push("https://taskmaster-next-ryfm.onrender.com/login")}
              >
                {lang == "En" ? "تسجيل دخول" : "Login"}
              </button>
            </div>
          </form>
        </div>
      )}

      {currentPage == 2 && (
        <div className="w-full bg-white h-fit drop-shadow-2xl pb-7 sm:h-[610px] sm:max-w-[500px]">
          <div className="pt-[25px] text-center font-bold text-4xl text-primary">
            {lang == "En" ? "تسجيل دخول" : "Complete Signup"}
          </div>
          <form
            autoComplete="off"
            action=""
            className="flex flex-col px-3 space-y-3 "
          >
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
              <p
                className={`text-xl pt-4  ${
                  lang == "En" ? "text-right" : "text-left"
                }`}
              >
                {lang == "En" ? "اسم المستخدم" : "Username"}
              </p>
              <input
                type="text"
                autoComplete="off"
                onChange={handleChange}
                value={formData.username}
                required
                name="username"
                className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-sm ${
                  lang == "En" ? "text-right  pr-3" : "text-left"
                } `}
              />
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
              <p
                className={`text-xl  ${
                  lang == "En" ? "text-right" : "text-left"
                }`}
              >
                {lang == "En" ? "رقم الهاتف" : "Phone"}
              </p>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-sm ${
                  lang == "En" ? "text-right  pr-3" : "text-left"
                } `}
              />
            </div>
            <div className="flex flex-col text-secondery font-bold gap-3 pb-3 relative ">
              <p
                className={`text-xl ${
                  lang == "En" ? "text-right" : "text-left"
                }`}
              >
                {lang == "En" ? "سنة الميلاد" : "Birthday Year"}
              </p>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-sm ${
                  lang == "En" ? "text-right  pr-3" : "text-left"
                } `}
              />
            </div>

            <button
              className={`w-full bg-primary text-white font-bold text-2xl py-4 rounded-lg flex justify-center gap-3 items-center drop-shadow-md ${
                lang == "En" ? "flex-row-reverse" : "flex-row"
              }`}
              onClick={handleSubmit}
              type="submit"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              ) : lang == "Ar" ? (
                <>
                  <span>Complete Signup</span>
                  <FaArrowRight />
                </>
              ) : (
                <>
                  <span>"إكمال إنشاء الحساب"</span>
                  <FaArrowLeft />
                </>
              )}
            </button>
            <button
              className={`w-full bg-gray-500 text-white font-bold text-2xl py-4 rounded-lg flex justify-center gap-5 items-center drop-shadow-md ${
                lang == "En" ? "flex-row-reverse" : "flex-row"
              }`}
              type="button"
              onClick={handlePage}
            >
              <span>{lang == "En" ? "للخلف" : "Back"}</span>
              {lang == "En" ? <FaArrowRight /> : <FaArrowLeft />}
            </button>
            <div
              className={`space-y-3 flex gap-2 justify-center pt-2 ${
                lang == "En" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <p className="text-gray-500 text-2xl font-josefin text-center">
                {lang == "En"
                  ? "تمتلك حساب بالفعل!"
                  : "Alrady have an account!"}
              </p>
              <button
                className="font-bold text-xl text-primary pb-10"
                type="button"
                onClick={() => router.push("https://taskmaster-next-ryfm.onrender.com/login")}
              >
                {lang == "En" ? "تسجيل دخول" : "Login"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
