/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import expressiveCode from "astro-expressive-code";

const SERVER_PORT = 3000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://thephilosophicalcode.com";

const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");

const astroExpressiveCodeOptions = {
  theme: 'github-dark' 
}

let BASE_URL = LOCALHOST_URL;

if (isBuild) {
  BASE_URL = LIVE_URL;
}

if (process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development") {
  BASE_URL = `https://${process.env.VERCEL_URL}`;
}

export default defineConfig({
  server: { port: SERVER_PORT },
  site: BASE_URL,
  integrations: [sitemap()],
  experimental: {
    viewTransitions: true
  }
});

export default defineConfig({
  site: BASE_URL,
  integrations: [expressiveCode(astroExpressiveCodeOptions), mdx(), sitemap()]
});
