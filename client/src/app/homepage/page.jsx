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
  
  useEffect (() => {
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

  const { lang, setLang } = useAppContext();

  return (
    <div className="min-h-screen pb-[50px] w-full flex flex-col bg-[#FAFAFA] ">
      <div
        className="h-[250px] sm:h-[350px]  w-full  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/h_page/bg_img.svg')" }}
      ></div>

      {/* writing field */}
      <div className=" w-[85%] font-josefin min-[900px]:mt-[-160px] sm:w-[500px] rounded-[10px] relative  bg-white self-center mt-[-205px] flex pl-4 pr-2 py-2 mb-12  sm:mb-6 ">
        <input
          type="text"
          placeholder="Create a new todo..."
          className="placeholder:font-josefin placeholder:text-[18px] placeholder:font-normal w-full outline-none text-secondery text-2xl font-semibold"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button className="cursor-pointer " onClick={handleTodo}>
          <IoAddCircleOutline color="#494C6B" size={40} />
        </button>
      </div>

      <div className=" w-[85%] sm:w-[500px]  h-fit self-center rounded-[6px] bg-white shadow-2xl ">
        {/* lising field */}
        {filteredTodo.map((item, index) => {
          return (
            <div
              className="h-[60px] w-full  bg-white  self-center border-b-[0.5px] rounded-t-[6px] border-b-gray-400 mb-2"
              key={index}
            >
              <div className="flex items-center font-josefin">
                <label className="relative flex space-x-3 mr-auto  items-center cursor-pointer pl-[25px]">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleChecker(index)}
                    className="peer hidden"
                  />
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:bg-primary transition-all duration-200 flex items-center justify-center">
                    {item.checked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`ml-2 text-[20px] font-bold  ${
                      item.checked
                        ? "line-through text-[#D1D2DA] "
                        : "text-secondery"
                    } `}
                  >
                    {item.name}
                  </span>
                </label>
                <button onClick={() => handleRemove(index)} className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#494C6B]"
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
        <div className=" w-full flex justify-between  items-center text-secondery h-[50px] px-4">
          <p className="font-medium">{filteredTodo.length} items left</p>
          <div className=" font-semibold flex space-x-4 max-sm:hidden">
            <button
              onClick={() => setFilterStatus("all")}
              className={`${filterStatus == "all" ? "text-primary" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`${filterStatus == "active" ? "text-primary" : ""}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`${filterStatus == "completed" ? "text-primary" : ""}`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() =>
              setTodo((prev) => prev.filter((item) => !item.checked))
            }
            className="font-medium"
          >
            Clear Completed
          </button>
        </div>
      </div>

      {/* filtering listed task for mobile version*/}
      <div className="w-[85%] bg-white space-x-6 self-center shadow-2xl rounded-[6px] mt-4   flex justify-between items-center text-secondery h-[50px] px-16 font-semibold sm:hidden ">
        <button className="text-primary">All</button>
        <button className="">Active </button>
        <button className="">Completed</button>
      </div>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";

// export default function Home() {
//   const [todo, setTodo] = useState<{ text: string; done: boolean }[]>([]);
//   const [value, setValue] = useState("");

//   const handleAddTodo = () => {
//     if (value.trim()) {
//       setTodo([...todo, { text: value, done: false }]);
//       setValue("");
//     }
//   };

//   const handleToggle = (index: number) => {
//     const updated = [...todo];
//     updated[index].done = !updated[index].done;
//     setTodo(updated);
//   };

//   const handleDelete = (index: number) => {
//     setTodo(todo.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="h-screen w-full font-josefin bg-[#f2f2f2] text-[#494c6b]">
//       {/* Background Header */}
//       <div
//         className="h-[250px] w-full bg-cover bg-center bg-no-repeat flex justify-center items-start pt-[50px]"
//         style={{ backgroundImage: "url('/images/bg_img.svg')" }}
//       >

//       </div>

//       {/* Input Field */}
//       <div className="w-[500px] mx-auto -mt-[30px]">
//         <div className="flex bg-white px-4 py-3 rounded-md shadow-md">
//           <input
//             type="text"
//             placeholder="Create a new todo..."
//             className="w-full outline-none placeholder:font-josefin placeholder:text-[18px] text-lg"
//             onChange={(e) => setValue(e.target.value)}
//             value={value}
//           />
//           <button onClick={handleAddTodo}>
//             <IoAddCircleOutline size={30} />
//           </button>
//         </div>

//         {/* Todo List */}
//         <div className="mt-6 rounded-md shadow-md bg-white">
//           {todo.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
//             >
//               <div className="flex items-center gap-4">
//                 <button onClick={() => handleToggle(index)}>
//                   {item.done ? (
//                     <FaCheckCircle className="text-purple-500" />
//                   ) : (
//                     <FaRegCircle />
//                   )}
//                 </button>
//                 <span
//                   className={`text-lg ${
//                     item.done ? "line-through text-gray-400" : ""
//                   }`}
//                 >
//                   {item.text}
//                 </span>
//               </div>
//               <button onClick={() => handleDelete(index)}>
//                 <RxCross2 className="text-gray-400 hover:text-black" />
//               </button>
//             </div>
//           ))}

//           {/* Footer */}
//           <div className="flex justify-between px-4 py-2 text-sm text-gray-500">
//             <span>{todo.filter((t) => !t.done).length} items left</span>
//             <div className="flex gap-3">
//               <span className="text-pink-500 cursor-pointer">All</span>
//               <span className="cursor-pointer">Active</span>
//               <span className="cursor-pointer">Completed</span>
//             </div>
//             <span className="cursor-pointer">Clear Completed</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

{
  /* <div className="flex bg-white relative">
<input
  type="text"
  name=""
  id=""
  placeholder="Create a new todo..."
  className="placeholder:font-josefin placeholder:text-[18px] placeholder:font-normal w-full outline-none text-secondery text-2xl font-semibold"
  onChange={(e) => setValue(e.target.value)}
  value={value}
/>
<button className="cursor-pointer " onClick={handleTodo}>
  <IoAddCircleOutline color="#494C6B" size={40} />
</button>
</div>
</div>
<div className="">
{todo.map((item, index) => {
  return (
    <div
      className="h-[48px] w-full bg-white pl-[80px]"
      key={index}
    >
      {item}
    </div>
  );
})}
</div> */
}
