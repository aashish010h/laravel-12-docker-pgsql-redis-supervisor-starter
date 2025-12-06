import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardHome from "@/pages/DashboardHome";
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
        children: [{ index: true, element: <DashboardHome /> }],
    },
]);

export default router;
