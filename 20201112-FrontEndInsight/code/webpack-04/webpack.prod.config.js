const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.base.config.js");
const { merge } = require("webpack-merge");
const optimizeCss = require("optimize-css-assets-webpack-plugin");
const glob = require("glob-all");
const purifycss = require("purifycss-webpack");
const prodConfig = {
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-[hash:6].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/style"),
    },
    modules: [path.resolve(__dirname, "./node_modules")],
    extensions: [".js", ".json", ".jsx", ".vue"], //后缀列表 希望大家不要省略后缀，因为会浪费查询时间。
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "css/index-[contenthash:6].css",
    }),
    new purifycss({
      paths: glob.sync([
        path.resolve(__dirname, "./src/*.html"),
        path.resolve(__dirname, "./src/*.js"),
      ]),
    }),
    new optimizeCss({
      cssProcessor: require("cssnano"),
    }),
  ],
};
module.exports = merge(baseConfig, prodConfig);
