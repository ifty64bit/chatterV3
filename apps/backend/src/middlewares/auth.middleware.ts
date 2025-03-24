import Elysia from "elysia";
import jwt from "jsonwebtoken";

export const authMiddleware = new Elysia({
    name: "auth:middleware",
}).derive({ as: "scoped" }, ({ headers }) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET not found");
    }
    const token = headers.authorization?.split(" ")[1];
    if (!token) {
        throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
        id: number;
        username: string;
    };
    if (!decoded) {
        throw new Error("Unauthorized");
    }

    return { user: decoded };
});
