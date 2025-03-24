import type { App } from "@apps/backend";
import { treaty } from "@elysiajs/eden";

const client = treaty<App>("localhost:3000");

export default client;
