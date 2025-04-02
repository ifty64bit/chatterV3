export async function handleApiResponse<T, E = unknown>(
    promise: Promise<{ data: T; error?: E }>
): Promise<NonNullable<T>> {
    const { data, error } = await promise;
    if (error && data === null) {
        throw error as E;
    }
    if (!data) {
        throw new Error("No data returned from API");
    }
    return data;
}
