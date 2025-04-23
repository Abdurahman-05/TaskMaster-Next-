'use client';
import { createContext, useContext, useState } from "react";


const appContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }){

    let [lang,setLang] = useState<string>("Ar");
    const [theme, setTheme] = useState<string>("light");


  return (
    <appContext.Provider value={{lang,setLang,theme,setTheme}}>
     {children}
    </appContext.Provider>
  )
}

export function useAppContext() {
  return useContext(appContext)
}
// 'use client';
// import { createContext, useContext, useState } from "react";


// const appContext = createContext<any>(undefined);

// export function AppWrapper({ children }: { children: React.ReactNode }) {
//   const [lang, setLang] = useState<string>("En");

//   return (
//     <appContext.Provider value={{ lang, setLang }}>
//       {children}
//     </appContext.Provider>
//   );
// }

// export function useAppContext() {
//   const context = useContext(appContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppWrapper");
//   }
//   return context;
// }
