"use client";

import { IoAddCircleOutline } from "react-icons/io5";
import { use, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import ProtectedRouter from "@/components/protectedRoute";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const { lang } = useAppContext();
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleTodo = () => {
    if (value) {
      const item = { name: value, checked: false };
      setTodo([item, ...todo]);
      console.log(todo);
      setValue("");
    }
  };

  useEffect(() => {
    console.log(todo);
  });

  const handleRemove = (index) => {
    const taskRemoved = todo.filter((_, i) => i !== index);
    setTodo(taskRemoved);
  };

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const response = await fetch("http://localhost:5000/task", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await response.json();
        setTodo(data.tasks || []);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    loadTodo();
  }, []);

  // Save todo to backend when todo changes
  useEffect(() => {
    const saveTodo = async () => {
      try {
        await fetch("http://localhost:5000/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(todo),
        });
      } catch (error) {
        console.error("Error saving todo to server:", error);
      }
    };

    saveTodo();
  }, [todo]);

  const filteredTodo = todo.filter((item) => {
    if (filterStatus == "active") return !item.checked;
    if (filterStatus == "completed") return item.checked;
    return true;
  });

  const handleChecker = (index) => {
    const updatedTodos = todo.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setTodo(updatedTodos);
  };

  return (
    <div className="min-h-screen pb-[50px] w-full flex flex-col bg-[#FAFAFA] dark:bg-black">
      <div
        className="h-[250px] sm:h-[350px]  w-full  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/h_page/bg_img.svg')" }}
      ></div>

      {/* writing field */}
      <div
        className={`w-[85%] font-josefin min-[900px]:mt-[-160px] sm:w-[500px] rounded-[10px] relative  bg-white dark:bg-darkSecondery self-center mt-[-205px] flex pl-4 pr-2 py-2 mb-12  sm:mb-6 ${
          lang == "En" ? "flex-row-reverse text-right" : ""
        }`}
      >
        <input
          type="text"
          placeholder={
            lang == "Ar" ? "Create a new todo..." : "....إنشاء ملاحظة جديدة"
          }
          className={`placeholder:font-josefin placeholder:text-[18px] placeholder:font-normal w-full outline-none text-secondery dark:text-[#C8CBE7] text-2xl font-semibold ${
            lang == "En" ? "text-right pr-4" : ""
          }`}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button className="cursor-pointer " onClick={handleTodo}>
          <IoAddCircleOutline color="#494C6B" size={40} />
        </button>
      </div>

      <div className=" w-[85%] sm:w-[500px]  h-fit self-center rounded-[6px] bg-white dark:bg-darkSecondery shadow-2xl ">
        {/* lising field */}
        {filteredTodo.map((item, index) => {
          return (
            <div
              className="h-[60px] w-full  bg-white dark:bg-darkSecondery self-center border-b-[0.5px] rounded-t-[6px] border-b-gray-400 mb-2"
              key={index}
            >
              <div
                className={`flex items-center font-josefin ${
                  lang == "Ar" ? "text-left " : "text-right flex-row-reverse"
                } `}
              >
                <label
                  className={`relative flex space-x-3   items-center cursor-pointer pl-[25px] ${
                    lang == "Ar"
                      ? " mr-auto"
                      : " flex-row-reverse justify-between ml-auto"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleChecker(index)}
                    className="peer hidden"
                  />
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:bg-primary transition-all duration-200 flex items-center justify-center ">
                    {item.checked && (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth=""
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`ml-2 mr-2 text-[24px] font-bold  ${
                      item.checked
                        ? "line-through text-[#D1D2DA] dark:text-[#4D5067]"
                        : "text-secondery dark:text-[#C8CBE7] "
                    } `}
                  >
                    {item.name}
                  </span>
                </label>
                <button onClick={() => handleRemove(index)} className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#494C6B] dark:text-[#5B5E7E]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

        {/* filtering listed task */}
        <div
          className={`w-full flex justify-between  items-center text-secondery dark:text-[#C8CBE7] h-[50px] px-4 ${
            lang == "En" ? "flex-row-reverse " : ""
          }`}
        >
          <p
            className={`font-medium flex gap-2 ${
              lang === "En"
                ? "flex-row-reverse space-x-reverse space-x-3"
                : "flex-row space-x-3"
            }`}
          >
            <span className="ml-2">{filteredTodo.length}</span> {lang == "En" ? "ملاحظات متبقية":"items left"}
          </p>

          <div className={`font-semibold flex gap-4 max-sm:hidden ${
            lang == "En" ? "flex-row-reverse " : ""
          }`}>
            <button
              onClick={() => setFilterStatus("all")}
              className={`${filterStatus == "all" ? "text-primary" : ""}`}
            >
              {lang == "En" ? "الكل":"All"}
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`${filterStatus == "active" ? "text-primary" : ""}`}
            >
            {lang == "En" ? "المتبقي":"Active"}
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`${filterStatus == "completed" ? "text-primary" : ""}`}
            >
              {lang == "En" ? "منتهي":"Completed"}
            </button>
          </div>
          <button
            onClick={() =>
              setTodo((prev) => prev.filter((item) => !item.checked))
            }
            className="font-medium"
          >
             {lang == "En" ? "مسح ما تم إنهاؤه":"Clear Completed"}
          </button>
        </div>
      </div>

      {/* filtering listed task for mobile version*/}
      <div className="w-[85%] bg-white dark:bg-darkSecondery dark:text-[#C8CBE7] space-x-6 self-center shadow-2xl rounded-[6px] mt-4   flex justify-between items-center text-secondery h-[50px] px-16 font-semibold sm:hidden ">
        <button className="text-primary">All</button>
        <button className="">Active </button>
        <button className="">Completed</button>
      </div>
    </div>
  );
}

