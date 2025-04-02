import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "./modules/auth/auth.controller";
import { roomController } from "./modules/room/room.controller";

const app = new Elysia()
    .use(
        cors({
            origin: "localhost:5173",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    )
    // .onError(({ set, error, code }) => {
    //     console.log(error);
    //     console.log(code);

    //     if (typeof error === "string") {
    //         return error;
    //     }
    // })
    .get("/", () => "Hello Elysia")
    .use(authController)
    .use(roomController)
    .listen(3000, ({ hostname, port }) => {
        console.log(`🦊 Elysia is running at ${hostname}:${port}`);
    });

export type App = typeof app;
