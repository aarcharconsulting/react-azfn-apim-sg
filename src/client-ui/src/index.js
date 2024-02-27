import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CrudProvider } from "./Contexts/CrudContext";
import { GlobalProvider } from "./Contexts/GlobalContext";
import GlobalModal from "./GlobalModal";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CrudProvider>
      <GlobalProvider>
      
        <App /> 
        <GlobalModal />
        <ToastContainer />

      </GlobalProvider>
    </CrudProvider>
  </React.StrictMode>
);
