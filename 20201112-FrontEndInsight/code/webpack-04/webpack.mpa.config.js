const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const merge = require("webpack-merge");
console.log(process.env.NODE_ENV);
const glob = require("glob");
// entry: {
//   index: "./src/index.js",
//   list: "./src/list.js",
//   detail: "./src/detail.js",
//   login: "./src/login.js",
// },

// new htmlWebpackPlugin({
//       template: "./src/index.html",
//       filename: "index.html",
//       chunks: ["main"],
//     }),

const setMpa = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  //生成entry
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  entryFiles.map((item, index) => {
    const entryFile = item;
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = entryFile;

    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName, "detail"],
      })
    );
  });

  //
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMpa();

const mpa = {
  entry,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:6].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
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
        use: "file-loader",
      },
    ],
  },
  resolveLoader: {
    modules: ["./node_modules", "./myLoaders"],
  },
  devtool: "inline-source-map",
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "css/index-[contenthash:6].css",
    }),
  ],
};

module.exports = (env) => {
  if (env && env.development) {
    //写开发配置
  } else {
    //生产配置
  }
};
