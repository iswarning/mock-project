import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { persistor, store } from "./store/store.js";
import { Provider } from "react-redux";
import ToastCustom from "./components/ToastCustom.jsx";
import './index.scss'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastCustom />
      </PersistGate>
    </Provider>
  </StrictMode>
);
