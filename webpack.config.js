const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const { getGlobals } = require("./config/get-globals");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
const globals = getGlobals();
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "public", "index.ejs"),
      alwaysWriteToDisk: true,
      minify: {
        collapseWhitespace: isProd,
      },
      inject: false,
      templateParameters: (options) => {
        const js = Object.keys(options.assets)
          .filter((el) => /\.js$/.test(el))
          .map((el) => "/" + el);
        const css = Object.keys(options.assets)
          .filter((el) => /\.css$/.test(el))
          .map((el) => "/" + el);
        return {
          css,
          js,
          globals,
        };
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      minify: false,
      template: path.resolve(__dirname, "config", "render-stats.js"),
      filename: path.resolve(__dirname, "config", "build-stats.json"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    // if u need to copy file from dev folders to build
    // new CopyWebpackPlugin([
    //   {
    //     from: "",
    //     to: "",
    //   },
    // ]),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: { loader: "ejs-compiled-loader", options: {} },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ejs", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    port: 3007,
    hot: isDev,
  },
  optimization: optimization(),
};
