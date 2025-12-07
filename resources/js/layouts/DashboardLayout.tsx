import React, { FC, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "@/components/ui/dashboard/Navbar";
import Sibebar from "@/components/ui/dashboard/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";

const DashboardLayout: FC = () => {
    const { restoreLogin } = useAuthStore();
    useEffect(() => {
        restoreLogin();
    }, []);
    return (
        <div className="d-flex" id="wrapper">
            <div
                className="bg-dark border-end"
                id="sidebar-wrapper"
                style={{
                    width: "250px",
                    minHeight: "100vh",
                    position: "fixed",
                    zIndex: 1000,
                }}
            >
                <div className="sidebar-heading text-white fw-bold py-4 px-3">
                    Dataset Management
                </div>
                <Sibebar />
            </div>

            <div
                id="page-content-wrapper"
                style={{ marginLeft: "250px", width: "100%" }}
            >
                <Navbar />
                <div className="container-fluid p-4">
                    <h2 className="mb-4 fw-light text-primary">
                        Dashboard Overview
                    </h2>
                    <div className="row">
                        <Outlet />
                    </div>

                    <footer className="pt-4 mt-5 text-muted border-top">
                        © {new Date().getFullYear()} Aashish Giri
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
