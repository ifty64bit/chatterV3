type ApiError<T> = NonNullable<Awaited<ReturnType<T>>["error"]>;
