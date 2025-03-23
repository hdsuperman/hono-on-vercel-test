import { handle } from "hono/vercel";
import app from "./app";

const handler = handle(app);

export const GET = handler;
export const PUT = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
