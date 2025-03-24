import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db = drizzle(process.env.DATABASE_URL!, {
    schema: {
        ...schema,
    },
    logger: true,
});

export default db;
