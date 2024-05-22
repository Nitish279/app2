const { merge } = require("webpack-merge");
const common = require("../webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = merge(common, {
  entry: "./src/index",
  devServer: {
    port: 3004,
  },
  output: {
    publicPath: "http://localhost:3004/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./App2": "./src/App.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "^18.3.1",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.3.1",
        },
      },
    }),
  ],
});
