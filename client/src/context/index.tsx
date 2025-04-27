// 'use client';
// import { createContext, useEffect, useContext, useState } from "react";


// const appContext = createContext<any>(undefined);

// export function AppWrapper({ children }: { children: React.ReactNode }){

//     let [lang,setLang] = useState<string>("Ar");
//     const [theme, setTheme] = useState<string>("light");
    
//     useEffect(() => {
//       const storedLang = localStorage.getItem("lang") || "Ar";
//       const storedTheme = localStorage.getItem("theme") || "light";
  
//       setLang(storedLang);  // Set initial lang state
//       setTheme(storedTheme); // Set initial theme state
  
//       // Apply the theme to <html> element based on stored theme
//       if (storedTheme === "dark") {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     }, []); // Empty dependency array to run only once
  
//     // Toggle language function
//     const handleLang = () => {
//       const newLang = lang === "Ar" ? "En" : "Ar";
//       setLang(newLang);
//       localStorage.setItem("lang", newLang);  // Store updated lang in localStorage
//     };
  
//     // Toggle theme function
//     const handleTheme = () => {
//       const newTheme = theme === "dark" ? "light" : "dark";
//       setTheme(newTheme);
//       localStorage.setItem("theme", newTheme);  // Store updated theme in localStorage
  
//       // Apply the theme class to <html> element
//       if (newTheme === "dark") {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     };
  
   
    
  
//   return (
//     <appContext.Provider value={{lang,handleLang,theme,handleTheme}}>
//      {children}
//     </appContext.Provider>
//   )
// }

// export function useAppContext() {
//   return useContext(appContext)
// }
// // 'use client';
// // import { createContext, useContext, useState } from "react";


// // const appContext = createContext<any>(undefined);

// // export function AppWrapper({ children }: { children: React.ReactNode }) {
// //   const [lang, setLang] = useState<string>("En");

// //   return (
// //     <appContext.Provider value={{ lang, setLang }}>
// //       {children}
// //     </appContext.Provider>
// //   );
// // }

// // export function useAppContext() {
// //   const context = useContext(appContext);
// //   if (!context) {
// //     throw new Error("useAppContext must be used within an AppWrapper");
// //   }
// //   return context;
// // }


"use client";
import { createContext, useContext, useState, useEffect } from "react";


const appContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>("Ar");
  const [theme, setTheme] = useState<string>("light");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "Ar";
    const storedTheme = localStorage.getItem("theme") || "light";

    setLang(storedLang);  
    setTheme(storedTheme); 
    


    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setLoading(false);
  }, []);
  


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]); 


  const handleLang = () => {
    const newLang = lang === "Ar" ? "En" : "Ar";
    setLang(newLang);
    localStorage.setItem("lang", newLang);  
  };


  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); 
  };
  
 
  
  return (
    <appContext.Provider value={{ lang, handleLang, theme, handleTheme }}>
      {children}
    </appContext.Provider>
  );
}

// Custom hook to access context values
export function useAppContext() {
  return useContext(appContext);
}
