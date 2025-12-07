import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardHome from "@/pages/DashboardHome";
import FileList from "@/pages/Files/FileList";
import FileAdd from "@/pages/Files/FileAdd";
//import ProtectedRoute from "./ProtectedRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [{ index: true, element: <LoginPage /> }],
    },
    {
        path: "/dashboard",
        element: (
            // <ProtectedRoute>
            <DashboardLayout />
            // </ProtectedRoute>
        ),
        children: [
            { index: true, element: <DashboardHome /> },
            { path: "files", element: <FileList /> },
            { path: "files/store", element: <FileAdd /> },
        ],
    },
]);

export default router;
