import React, { useState, useEffect } from 'react';

const Alert = (type,message) => {
  const [show, setShow] = useState(true);

  // Automatically hide the alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // 3000ms = 3 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    show && (
      <div className={`fixed top-20 right-0 min-w-[200px] h-24 px-6 ${type == "success"?"bg-green-500":"bg-red-500"} text-white text-center py-2 z-50`}>
        {message}
      </div>
    )
  );
};

export default Alert;
