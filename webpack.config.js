const path = require("path");
const CopyrightWebpackPlugin = require("./plugins/copyrightWebpackPlugin.js");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolveLoader: {
    modules: ["node_modules", "./loaders"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: "replaceLoader" },
          {
            loader: "replaceLoaderAsync",
            options: {
              name: "你好"
            }
          }
        ]
      }
    ]
  },
  plugins: [new CopyrightWebpackPlugin({ filename: "aa.txt" })],
  mode: "development",
  devtool: "source-map"
};
