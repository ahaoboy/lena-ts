import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const isDev = process.env["NODE_ENV"] === "development";

export default defineConfig({
  base: "/lena-ts/",
  plugins: [
    react(),
    ...(process.env["ANALYZE"] ? [visualizer({ open: true, gzipSize: true })] : []),
  ],
  resolve: {
    alias: isDev
      ? {}
      : {
          react: "https://esm.sh/react@19",
          "react-dom": "https://esm.sh/react-dom@19",
          "@mui/material": "https://esm.sh/@mui/material@9?standalone",
          "@mui/icons-material": "https://esm.sh/@mui/icons-material@9",
          "@emotion/react": "https://esm.sh/@emotion/react@11",
          "@emotion/styled": "https://esm.sh/@emotion/styled@11",
        },
  },
});
