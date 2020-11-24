const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:6].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          // miniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 2048,
          },
        },
      },
      {
        test: /\.woff2$/,
        include: path.resolve(__dirname, "./src"),
        use: "file-loader",
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        use: "babel-loader",
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
  // resolveLoader: {
  //   modules: ["./node_modules", "./myLoaders"],
  // },
  devtool: "inline-source-map",
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new CleanWebpackPlugin(),
    // new miniCssExtractPlugin({
    //   filename: "css/index-[contenthash:6].css",
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
