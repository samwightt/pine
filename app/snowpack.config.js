/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
    [
      "@snowpack/plugin-build-script",
      { cmd: 'postcss --env "development"', input: [".css"], output: [".css"] },
    ],
    [
      "@snowpack/plugin-run-script",
      { cmd: "yarn relay", watch: "yarn relay:watch", name: "Relay" },
    ],
    ["./relay.snowpack.js"],
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
