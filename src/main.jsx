import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import ToastCustom from "./components/ToastCustom.jsx";
import "./index.scss";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
    <ToastCustom />
  </Provider>
  // </StrictMode>
);
