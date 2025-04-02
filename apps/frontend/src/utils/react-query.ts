import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function createApiMutation<
    T extends (...args: never[]) => Promise<{ data: unknown; error?: unknown }>,
>(apiFunc: T) {
    return function useMutationWrapper(
        options?: Omit<
            UseMutationOptions<
                NonNullable<Awaited<ReturnType<T>>["data"]>,
                NonNullable<Awaited<ReturnType<T>>["error"]>,
                Parameters<T>[0]
            >,
            "mutationFn"
        >
    ) {
        return useMutation({
            mutationKey: [apiFunc.name],
            mutationFn: async (variables: Parameters<T>[0]) => {
                const { data, error } = await apiFunc(variables);
                if (error) {
                    throw error;
                }
                if (!data) {
                    throw new Error("No data returned from API");
                }
                return data;
            },
            ...options,
        });
    };
}
