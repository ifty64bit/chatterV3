import { type LoginFormValues } from "@/components/LoginForm";
import client from "@apps/api";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (values: LoginFormValues) => {
            const { data, error } = await client.auth.login.post(values);
            if (error) {
                throw error as typeof error;
            }
            return data;
        },
        onSuccess: (data) => {
            console.log("DATA: :", data);
        },
        onError: (e: ApiError<typeof client.auth.login.post>) => {
            console.error("Error: ", e.status, e?.value);
        },
    });
}
