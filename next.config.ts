import type { NextConfig } from "next";
import {
  findPageRoutes,
  validateFeatures,
} from "./src/server/features/validate.ts";
import { RAG_TIMEOUTS } from "./src/config/rag.ts";
import { parseRagPort } from "./src/config/rag-port.ts";
import { join } from "node:path";

validateFeatures(findPageRoutes(join(process.cwd(), "src/app")));

const pages = process.env.BUILD_TARGET === "pages";
const ragPort = pages ? undefined : parseRagPort(process.env.RAG_PORT);
const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { proxyTimeout: RAG_TIMEOUTS.proxyMs },
  env: { NEXT_PUBLIC_STATIC_DEMO: pages ? "true" : "false" },
  ...(!pages
    ? {
        async rewrites() {
          return [
            {
              source: "/api/rag",
              destination: `http://127.0.0.1:${ragPort}/api/rag`,
            },
          ];
        },
      }
    : {}),
  ...(pages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: process.env.PAGES_BASE_PATH || "",
        images: { unoptimized: true },
      }
    : {}),
};
export default nextConfig;
