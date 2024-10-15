import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssPresetEnv from "postcss-preset-env";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv()],
    },
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
    devSourcemap: env.mode === "development",
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      external: ["vue", "moment"],
      output: {
        globals: {
          vue: "Vue",
          moment: "moment",
        },
      },
    },
  },
}));
