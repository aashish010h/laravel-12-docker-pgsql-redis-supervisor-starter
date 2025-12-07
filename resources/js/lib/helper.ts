import { AxiosError } from "axios";

export function getErrorMessage(err: unknown): string {
    if (err instanceof AxiosError) {
        // AxiosError: try to get response message first
        return err.response?.data?.message || err.message || "Something went wrong";
    }

    if (err instanceof Error) {
        // Standard JS Error
        return err.message || "Something went wrong";
    }

    // Fallback for anything else
    return "Something went wrong";
}
