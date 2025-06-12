import { defineConfig } from "rollup";
import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import path from "path";
export default defineConfig({
  input: "index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve("./src"),
        },
      ],
    }),
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      sourceMap: false,
    }),
  ],
});
