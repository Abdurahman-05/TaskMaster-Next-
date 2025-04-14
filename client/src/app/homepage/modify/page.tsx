"use client";
import { log } from "console";
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import React from "react";
import { useAppContext } from "@/context";

interface List {
  name: string;
  checked: boolean;
}

export default function Modify() {
  const [todo, setTodo] = useState<List[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [value, setValue] = useState<string>("");
  const [ShowPwd, setShowPwd] = useState<boolean>(false);
  const handleTodo = () => {
    if (value) {
      const item: List = { name: value, checked: false };
      setTodo([item, ...todo]);
      setValue("");
    }
  };

  const filteredTodo = todo.filter((item) => {
    if (filterStatus == "active") return !item.checked;
    if (filterStatus == "completed") return item.checked;
    return true;
  });

  useEffect(() => {
    console.log(todo);
  }, [todo]);

  const handleChecker = (index: number) => {
    const updatedTodos = todo.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setTodo(updatedTodos);
  };

  const handleRemove = (index: number) => {
    const taskRemoved = todo.filter((_, i) => i !== index);
    setTodo(taskRemoved);
  };

  const { lang, setLang } = useAppContext();

  return (
    <div className="min-h-screen pb-[50px] w-full flex flex-col bg-[#FAFAFA] ">
      <div
        className="h-[250px] sm:h-[350px]  w-full  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/h_page/bg_img.svg')" }}
      ></div>

      {/* writing field */}
      <div className=" w-[85%] font-josefin min-[900px]:mt-[-160px] sm:w-[650px] rounded-[6px] relative  bg-white text-center self-center mt-[-205px] flex pl-4 pr-2 py-4 mb-12  sm:mb-6 ">
        <p className="text-center mx-auto text-2xl text-primary font-semibold">
          Modify User Information
        </p>
      </div>

      <div className=" w-[85%] sm:w-[650px]  h-fit self-center rounded-[6px] bg-white drop-shadow-xl pb-8 pt-8">
        <form
          autoComplete="off"
          action=""
          className="flex flex-col px-6 sm:px-12 md:px-20 space-y-5  "
        >
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
            <p className="text-xl">Email</p>
            <input
              type="email"
              autoComplete="email"
              className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-md"
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
            <p className="text-xl">Password</p>
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
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl">
            <p className="text-xl pt-4">Username</p>
            <input
              type="text"
              autoComplete="off"
              className="h-[50px] w-full bg-white  border-[0.5px] border-[rgba(73,76,107,0.2)] rounded-lg outline-none pl-2 text-secondery font-medium text-xl active:bg-white drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col text-secondery font-bold gap-3 text-2xl relative">
            <p className="text-xl">Phone</p>
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
        </form>
      </div>

      {/* filtering listed task for mobile version*/}
      <div className="w-[85%] sm:w-[650px] bg-primary space-x-6 self-center shadow-2xl rounded-[6px] mt-8  flex justify-between items-center text-white py-5 font-semibold  ">
        <p className="text-center mx-auto  text-2xl text-white font-semibold">Save Change</p>
    </div>
    </div>
  );
}
