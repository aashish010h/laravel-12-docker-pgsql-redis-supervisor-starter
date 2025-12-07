import { FileFormValues } from "@/schemas/fileSchema";
import axiosInstance from "./axiosInstance";

export async function uploadFile(data: any) {
    // await getCsrfCookie();
    const res = await axiosInstance.post("/csv/upload", data);
    return res.data;
}
