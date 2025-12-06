import React, { FC, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useAuthStore } from "./store/useAuthStore";
const App: FC = () => {
    const restoreLogin = useAuthStore((s) => s.restoreLogin);

    useEffect(() => {
        restoreLogin();
    }, []);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
