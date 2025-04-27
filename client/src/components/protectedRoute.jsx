
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } else {
      setIsChecking(false); 
    }
  }, [router]);
  
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;













// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const ProtectedRoute = ({ children }) => {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       router.push("/login");
//     }
//   }, [router]);

//   return <>{children}</>;
// };

// export default ProtectedRoute;