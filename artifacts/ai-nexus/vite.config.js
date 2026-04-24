import { defineConfig } from "vite";
import path from "path";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

const root = path.resolve(import.meta.dirname);

export default defineConfig({
  base: basePath,
  root,
  build: {
    outDir: path.resolve(root, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(root, "index.html"),
        about: path.resolve(root, "pages/about.html"),
        basics: path.resolve(root, "pages/basics.html"),
        tech: path.resolve(root, "pages/tech.html"),
        applications: path.resolve(root, "pages/applications.html"),
        comparison: path.resolve(root, "pages/comparison.html"),
        login: path.resolve(root, "pages/login.html"),
        contact: path.resolve(root, "pages/contact.html"),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: false,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
