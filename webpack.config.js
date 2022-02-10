/*jshint  esversion: 6 */
const path = require("path");
const cssChunk = require("extract-css-chunks-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new cssChunk({
      filename: "./css/[name].css",
    }),
    new htmlPlugin({
      filename: "index.html",
      template: "./src/index.pug",
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug/,
        loader: "pug-loader",
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: cssChunk.loader,
            options: {
              hmr: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".js", ".tsx"],
  },
  entry: ["./src/"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/app.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};
