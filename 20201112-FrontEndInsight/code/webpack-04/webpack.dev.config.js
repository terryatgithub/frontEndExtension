const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");
const devConfig = {
  output: {
    path: path.resolve(__dirname, "./dev"),
    filename: "[name]-[hash:6].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/style"),
    },
    modules: [path.resolve(__dirname, "./node_modules")],
    extensions: [".js", ".json", ".jsx", ".vue"], //后缀列表 希望大家不要省略后缀，因为会浪费查询时间。
  },
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:9092/",
      },
    },
    hot: true,
    hotOnly: true,
  },
  devtool: "inline-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(baseConfig, devConfig);
