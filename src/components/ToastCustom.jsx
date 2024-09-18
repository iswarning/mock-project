import { Toaster } from "react-hot-toast";

function ToastCustom() {
  return (
    <Toaster
      toastOptions={{
        duration: 2000,
        position: "bottom-start",
        style: {
          background: "linear-gradient(to bottom, #16eca5, #10B981)",
          color: "#fff",
        },
      }}
    />
  );
}

export default ToastCustom;