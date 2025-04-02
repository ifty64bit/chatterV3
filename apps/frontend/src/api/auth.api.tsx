import { createApiMutation } from "@/utils/react-query";
import client from "@apps/api";

// export function useLogin() {
//     return useMutation({
//         mutationKey: ["login"],
//         mutationFn: async (values: LoginFormValues) =>
//             handleApiResponse(client.auth.login.post(values)),
//         onSuccess: (data) => {
//             console.log("DATA: :", data);
//         },
//         onError: (e) => {
//             console.error("Error: ", e.status, e?.value);
//         },
//     });
// }

export const useLogin = createApiMutation(client.auth.login.post);
