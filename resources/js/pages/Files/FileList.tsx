import React from "react";
import { Link } from "react-router-dom";

// 1. Types for the UI (Strictly Typed)
interface FileRecord {
    id: string;
    name: string;
    type: "csv" | "pdf" | "img";
    size: string;
    uploadedBy: string;
    uploadDate: string; // ISO format
    status: "processed" | "pending" | "error";
}

// 2. Mock Data (So you can see what it looks like)
const mockFiles: FileRecord[] = [
    {
        id: "1",
        name: "student_intake_2025.csv",
        type: "csv",
        size: "2.4 MB",
        uploadedBy: "Aashish G.",
        uploadDate: "2025-11-28",
        status: "processed",
    },
    {
        id: "2",
        name: "module_requirements.pdf",
        type: "pdf",
        size: "450 KB",
        uploadedBy: "Admin",
        uploadDate: "2025-11-29",
        status: "pending",
    },
    {
        id: "3",
        name: "error_log_v2.csv",
        type: "csv",
        size: "12 KB",
        uploadedBy: "System",
        uploadDate: "2025-11-30",
        status: "error",
    },
];

const FileList = () => {
    return (
        <div className="container-fluid p-4">
            {/* --- ACTION HEADER --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold text-dark mb-1">Data Management</h4>
                    <p className="text-muted small mb-0">
                        Manage your CSV uploads and system files.
                    </p>
                </div>

                {/* The Button Above */}
                <Link
                    to="store"
                    className="btn btn-primary d-flex align-items-center gap-2 shadow-sm text-decoration-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <span>Upload New File</span>
                </Link>
            </div>

            {/* --- DATATABLE CARD --- */}
            <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr className="text-muted text-uppercase small fw-bold">
                                    <th scope="col" className="ps-4 py-3">
                                        File Name
                                    </th>
                                    <th scope="col" className="py-3">
                                        Uploaded Date
                                    </th>
                                    <th scope="col" className="py-3">
                                        Size
                                    </th>
                                    <th scope="col" className="py-3">
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-end pe-4 py-3"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {mockFiles.map((file) => (
                                    <tr key={file.id}>
                                        {/* File Name & Icon */}
                                        <td className="ps-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="rounded p-2 bg-light me-3 text-secondary">
                                                    {/* Simple Conditional Icon Logic */}
                                                    {file.type === "csv" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            fill="#198754"
                                                            className="bi bi-filetype-csv"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.244-.637 1.172 1.172 0 0 0-.595-.453 2.2 2.2 0 0 0-.878-.17c-.328 0-.612.071-.852.214-.24.143-.418.348-.535.617-.117.268-.176.577-.176.929 0 .351.059.66.176.928.117.268.295.474.535.617.24.143.524.214.852.214.353 0 .637-.072.852-.214.215-.143.37-.349.464-.617l.004-.006h-.768a.726.726 0 0 1-.212.308.57.57 0 0 1-.363.107.82.82 0 0 1-.483-.137.854.854 0 0 1-.301-.4a1.69 1.69 0 0 1-.097-.634Z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            fill="currentColor"
                                                            className="bi bi-file-earmark-text"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                                            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="d-block fw-bold text-dark">
                                                        {file.name}
                                                    </span>
                                                    <span className="small text-muted">
                                                        By {file.uploadedBy}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Date - UK Format */}
                                        <td className="text-secondary">
                                            {new Date(
                                                file.uploadDate
                                            ).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        {/* Size */}
                                        <td className="text-secondary font-monospace">
                                            {file.size}
                                        </td>

                                        {/* Status Badge */}
                                        <td>
                                            <span
                                                className={`badge rounded-pill bg-opacity-10 text-${
                                                    file.status === "processed"
                                                        ? "success"
                                                        : file.status ===
                                                          "pending"
                                                        ? "warning"
                                                        : "danger"
                                                } bg-${
                                                    file.status === "processed"
                                                        ? "success"
                                                        : file.status ===
                                                          "pending"
                                                        ? "warning"
                                                        : "danger"
                                                }`}
                                            >
                                                {file.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    file.status.slice(1)}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="text-end pe-4">
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-sm btn-white border hover-shadow"
                                                    title="Download"
                                                >
                                                    ⬇
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-white border hover-shadow text-danger"
                                                    title="Delete"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Pagination (Visual Only) */}
                <div className="card-footer bg-white border-top-0 py-3">
                    <div className="d-flex justify-content-between align-items-center small text-muted">
                        <span>Showing 1-3 of 3 files</span>
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-secondary disabled">
                                Previous
                            </button>
                            <button className="btn btn-sm btn-outline-secondary disabled">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileList;
