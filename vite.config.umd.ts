import { defineConfig, mergeConfig } from "vite";
import { resolve } from "node:path";
import baseConfig from "./vite.config.base";

export default defineConfig((env) =>
  mergeConfig(
    baseConfig(env),
    defineConfig({
      build: {
        lib: {
          formats: ["umd", "iife"],
          entry: resolve(__dirname, "src", "index.umd.ts"),
          name: "vdprDatePicker",
          fileName: "vdprDatePicker",
        },
      },
    })
  )
);
