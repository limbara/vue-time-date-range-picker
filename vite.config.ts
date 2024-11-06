import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import postcssPresetEnv from "postcss-preset-env";
import dtsPlugin from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [vue(), dtsPlugin({ tsconfigPath: "./tsconfig.app.json" })],
  resolve: {
    alias: {
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@composables": fileURLToPath(
        new URL("./src/composables", import.meta.url)
      ),
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
    lib: {
      formats: ["es", "umd", "iife"],
      entry: resolve(__dirname, "src", "index.ts"),
      name: "vdprDatePicker",
      fileName: "vdprDatePicker",
    },
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
