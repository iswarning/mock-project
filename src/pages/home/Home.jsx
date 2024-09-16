import React from "react";
import { ToastCommon } from "../../components/ToastCommon.jsx";
import { TOAST } from "../../store/constants.js";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const handleToaster = () => {
    ToastCommon(TOAST.SUCCESS, "Added Successfully!!");
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 2000,
          icon: <span className="toast-icon">👏</span>,
          position: "bottom-start",
          style: {
            background: "linear-gradient(to bottom, #16eca5, #10B981)",
            color: "#fff",
          },
        }}
      />
      <button onClick={() => handleToaster()}>Click Toaster</button>
    </div>
  );
};

export default Home;
