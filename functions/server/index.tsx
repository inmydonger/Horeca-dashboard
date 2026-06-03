import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-933d25e4/health", (c) => {
  return c.json({ status: "ok" });
});

// KV Store Generic API
const API_PREFIX = "/make-server-933d25e4/api/kv";

// Get single
app.get(`${API_PREFIX}/:key`, async (c) => {
  try {
    const key = c.req.param("key");
    const val = await kv.get(key);
    return c.json({ data: val });
  } catch (err: any) {
    console.error(`Error getting key: ${err.message}`);
    return c.json({ error: err.message }, 500);
  }
});

// Get by prefix
app.get(`${API_PREFIX}/prefix/:prefix`, async (c) => {
  try {
    const prefix = c.req.param("prefix");
    const vals = await kv.getByPrefix(prefix);
    return c.json({ data: vals });
  } catch (err: any) {
    console.error(`Error getting prefix: ${err.message}`);
    return c.json({ error: err.message }, 500);
  }
});

// Set single
app.post(`${API_PREFIX}/:key`, async (c) => {
  try {
    const key = c.req.param("key");
    const body = await c.req.json();
    await kv.set(key, body);
    return c.json({ success: true });
  } catch (err: any) {
    console.error(`Error setting key: ${err.message}`);
    return c.json({ error: err.message }, 500);
  }
});

// Delete single
app.delete(`${API_PREFIX}/:key`, async (c) => {
  try {
    const key = c.req.param("key");
    await kv.del(key);
    return c.json({ success: true });
  } catch (err: any) {
    console.error(`Error deleting key: ${err.message}`);
    return c.json({ error: err.message }, 500);
  }
});

Deno.serve(app.fetch);
