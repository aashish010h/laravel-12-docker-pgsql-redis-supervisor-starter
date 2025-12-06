import { LoginSchemaType } from "@/schemas/loginSchema";
import axiosInstance from "./axios";

export async function getCsrfCookie() {
    await axiosInstance.get("/sanctum/csrf-cookie");
}

export async function loginUser(credential:LoginSchemaType) {
    await getCsrfCookie();
    const res = await axiosInstance.post("/login", credential);
    return res.data;
}
