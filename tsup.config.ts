import { defineConfig, Options } from "tsup";

const options: Options = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ["esm"],
  outExtension: ({ format }) =>
    format === "esm" ? { js: ".js" } : { js: ".cjs" },
};

export default defineConfig([
  {
    ...options,
    entry: ["src/**/*.ts", "src/**/*.tsx"],
    outDir: "api",
    esbuildPlugins: [
      {
        name: "add-extension",
        setup(build) {
          const defaultExtension =
            build.initialOptions.format === "esm" ? ".js" : ".cjs";
          const extension =
            build.initialOptions.outExtension?.js ?? defaultExtension;
          build.onResolve({ filter: /.*/ }, (args) => {
            if (args.importer)
              return { path: args.path + extension, external: true };
          });
        },
      },
    ],
  },
]);
