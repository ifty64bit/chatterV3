import bcrypt from "bcryptjs";
import { Elysia, t } from "elysia";
import db from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const authController = new Elysia({
    name: "auth:controller",
    prefix: "/auth",
})
    .post(
        "/login",
        async ({ body, error }) => {
            const JWT_SECRET = process.env.JWT_SECRET;
            if (!JWT_SECRET) {
                throw new Error("JWT_SECRET not found");
            }
            const { username, password } = body;

            const [user] = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.username, username))
                .limit(1);
            if (!user) {
                throw error("Not Found", "User not found");
            }
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!isValidPassword) {
                throw error("Unauthorized", "Invalid password");
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                },
                JWT_SECRET,
                {
                    expiresIn: "365d",
                }
            );

            return { token };
        },
        {
            body: t.Object({
                username: t.String(),
                password: t.String(),
            }),
        }
    )
    .post(
        "/register",
        async ({ body }) => {
            const { username, password, email } = body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const [user] = await db
                .insert(usersTable)
                .values({
                    username,
                    email,
                    password: hashedPassword,
                })
                .returning();
            return user;
        },
        {
            body: t.Object({
                username: t.String(),
                password: t.String(),
                email: t.String(),
            }),
        }
    );
