import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
    <>
        <App />
    </>
);
