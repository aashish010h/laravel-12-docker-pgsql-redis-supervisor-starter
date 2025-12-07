import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="list-group list-group-flush">
            <Link
                to="/dashboard"
                className="list-group-item list-group-item-action bg-dark text-white border-0 py-3 ps-4"
                style={
                    {
                        "--bs-list-group-action-hover-color": "#20c997",
                        "--bs-list-group-action-active-bg": "#20c997",
                        "--bs-list-group-action-active-color": "#fff",
                        transition: "background-color 0.2s",
                    } as React.CSSProperties
                }
            >
                📊 Overview
            </Link>
            <Link
                to="files"
                className="list-group-item list-group-item-action bg-dark text-white border-0 py-3 ps-4"
                style={
                    {
                        "--bs-list-group-action-hover-color": "#20c997",
                        transition: "background-color 0.2s",
                    } as React.CSSProperties
                }
            >
                💼 Files
            </Link>
            <Link
                to="/profile"
                className="list-group-item list-group-item-action bg-dark text-white border-0 py-3 ps-4"
                style={
                    {
                        "--bs-list-group-action-hover-color": "#20c997",
                        transition: "background-color 0.2s",
                    } as React.CSSProperties
                }
            >
                👤 Profile & Settings
            </Link>
        </div>
    );
};

export default Sidebar;
