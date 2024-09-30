import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import ToastCustom from "./components/ToastCustom.jsx";
import "./index.scss";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastCustom />
    </PersistGate>
  </Provider>
  // </StrictMode>
);
