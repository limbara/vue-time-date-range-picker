import { defineConfig, mergeConfig } from "vite";
import { resolve } from "node:path";
import baseConfig from "./vite.config.base";

export default defineConfig((env) =>
  mergeConfig(
    baseConfig(env),
    defineConfig({
      build: {
        lib: {
          formats: ["es"],
          entry: resolve(__dirname, "src", "index.ts"),
          fileName: "vdprDatePicker",
        },
      },
    })
  )
);
