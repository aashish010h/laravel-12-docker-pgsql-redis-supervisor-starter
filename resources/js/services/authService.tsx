import { LoginSchemaType } from "@/schemas/loginSchema";
import axiosInstance from "./axiosInstance";

export async function getCsrfCookie() {
    await axiosInstance.get("/sanctum/csrf-cookie");
}

export async function login(credential: LoginSchemaType) {
    // await getCsrfCookie();
    const res = await axiosInstance.post("/login", credential);
    return res.data;
}

export async function getUser() {
    return axiosInstance.get("user");
}

export async function logoutUser() {
    return axiosInstance.post("logout");
}
