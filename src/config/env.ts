interface Env {
  NEWSAPI_KEY: string;
  GUARDIAN_KEY: string;
  NYT_KEY: string;
  NODE_ENV: "development" | "production" | "test";
}

const { VITE_NEWSAPI_KEY, VITE_GUARDIAN_KEY, VITE_NYT_KEY, MODE } = import.meta
  .env;

if (!VITE_NEWSAPI_KEY) throw new Error("Missing VITE_NEWSAPI_KEY");
if (!VITE_GUARDIAN_KEY) throw new Error("Missing VITE_GUARDIAN_KEY");
if (!VITE_NYT_KEY) throw new Error("Missing VITE_NYT_KEY");

export const env: Env = {
  NEWSAPI_KEY: VITE_NEWSAPI_KEY,
  GUARDIAN_KEY: VITE_GUARDIAN_KEY,
  NYT_KEY: VITE_NYT_KEY,
  NODE_ENV: MODE as Env["NODE_ENV"],
};
