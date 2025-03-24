class UnAuthorizedError extends Error {
    constructor(public message: string) {
        super(message);
    }
}
