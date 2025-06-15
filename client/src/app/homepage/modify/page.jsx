"use client";

import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import React from "react";
import { useAppContext } from "@/context";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

// interface List {
//   name: string;
//   checked: boolean;
// }

export default function Modify() {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    dateOfBirth: "",
  });
  const [ShowPwd, setShowPwd] = useState(false);
  const { lang } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        "https://taskmaster-next-ryfm.onrender.com/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error);
      } else toast.success("you data was updated!!");
    } catch (error) {
      toast.error("An error occurred while updating the user.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen pb-[50px] w-full flex flex-col bg-[#FAFAFA] dark:bg-darkPrimary ">
      <div
        className="h-[250px] sm:h-[350px]  w-full  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/h_page/bg_img.svg')" }}
      ></div>

      {/* writing field */}
      <div className=" w-[85%] font-josefin min-[900px]:mt-[-160px] sm:w-[650px] rounded-[6px] relative  bg-white dark:bg-darkSecondery text-center self-center mt-[-205px] flex pl-4 pr-2 py-4 mb-12  sm:mb-6 ">
        <p className="text-center mx-auto text-2xl text-primary font-semibold">
          {lang == "En" ? "تعديل بيانات الحساب" : "Modify User Information"}
        </p>
      </div>

      <div className=" w-[85%] sm:w-[650px]  h-fit self-center rounded-[6px] bg-white dark:bg-darkSecondery drop-shadow-xl pb-8 pt-8">
        <form
          autoComplete="off"
          action=""
          className="flex flex-col px-6 sm:px-12 md:px-20 space-y-5  "
        >
          <div className="flex flex-col text-secondery  font-bold gap-3 text-2xl">
            <p
              className={`text-xl dark:text-white ${
                lang == "En" ? "text-right" : "text-left"
              }`}
            >
              {lang == "En" ? "حساب" : "Email"}
            </p>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              className={`h-[50px] w-full bg-white dark:bg-[#404363] border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery  dark:text-white font-medium text-xl active:bg-white drop-shadow-md
                 ${lang == "En" ? "text-right pr-3" : "text-left"} `}
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
            <p
              className={`text-xl dark:text-white ${
                lang == "En" ? "text-right" : "text-left"
              }`}
            >
              {lang == "En" ? "الرقم السري" : "Password"}
            </p>
            <div
              className={`flex  flex-col ${
                lang == "En" ? "flex-row-reverse" : "text-left"
              }`}
            >
              <input
                type={ShowPwd ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="new-password"
                className={`h-[50px] w-full bg-white dark:bg-[#404363] border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery  dark:text-white font-medium text-xl active:bg-white drop-shadow-md
                  ${lang == "En" ? "text-right  pr-3" : "text-left"} `}
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
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
            <p
              className={`text-xl dark:text-white ${
                lang == "En" ? "text-right" : "text-left"
              }`}
            >
              {lang == "En" ? "اسم المستخدم" : "Username"}
            </p>
            <input
              type="text"
              autoComplete="off"
              name="username"
              value={data.username}
              onChange={handleChange}
              className={`h-[50px] w-full bg-white dark:bg-[#404363] border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery  dark:text-white font-medium text-xl active:bg-white drop-shadow-md
                  ${lang == "En" ? "text-right pr-3" : "text-left"} `}
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
            <p
              className={`text-xl dark:text-white ${
                lang == "En" ? "text-right" : "text-left"
              }`}
            >
              {lang == "En" ? "رقم الهاتف" : "Phone"}
            </p>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className={`h-[50px] w-full bg-white dark:bg-[#404363] border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery  dark:text-white font-medium text-xl active:bg-white drop-shadow-md
                  ${lang == "En" ? "text-right pr-3" : "text-left"} `}
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 pb-7 relative ">
            <p
              className={`text-xl dark:text-white ${
                lang == "En" ? "text-right" : "text-left"
              }`}
            >
              {lang == "En" ? "سنة الميلاد" : "Birthday Year"}
            </p>
            <input
              type="text"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={handleChange}
              className={`h-[50px] w-full bg-white dark:bg-[#404363] border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery  dark:text-white font-medium text-xl active:bg-white drop-shadow-md
                  ${lang == "En" ? "text-right pr-3" : "text-left"} `}
            />
          </div>
        </form>
      </div>

      {/* filtering listed task for mobile version*/}
      <div className="w-[85%] sm:w-[650px]  bg-primary space-x-6 self-center shadow-2xl rounded-[6px]   flex justify-between items-center text-white py-5 my-5 font-semibold  ">
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-center mx-auto  text-2xl text-white font-semibold"
        >
         {loading ? <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>:(lang == "En" ? "حفظ التعديلات" : "Save Change")}
        </button>
      </div>
    </div>
  );
}
