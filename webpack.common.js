const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    "background": "./src/background/index.js",
    "top-frame": "./src/content-scripts/all-frames/index.js",
    "all-frames": "./src/content-scripts/top-frame/index.js",
    "options-ui": "./src/options-ui/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json"
        },
        {
          from: "./src/icons",
          to: "icons"
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: "./src/options-ui/index.html",
      filename: "options-ui.html",
      chunks: ["options-ui"]
    }),
    new MiniCssExtractPlugin()
  ]
};
