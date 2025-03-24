import Elysia from "elysia";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const roomController = new Elysia({
    name: "room:controller",
    prefix: "/room",
})
    .use(authMiddleware)
    .get("/", ({ user }) => {
        return { user };
    });
