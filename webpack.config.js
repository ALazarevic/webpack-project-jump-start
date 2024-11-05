const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.ts",
    output: {
      filename: "js/[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: "html-loader",
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            transpileOnly: true, // by adding this, it helps you skip the typing check while compiling
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: "asset/resource",
          use: [
            {
              loader: "image-webpack-loader",
              options: { disable: !isProduction },
            },
          ],
          generator: {
            filename: "images/[name].[contenthash][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/pages/index.html",
        chunks: ["main"],
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      hot: true,
      port: 8080,
      open: true,
      client: {
        logging: "info", // Logs info for debugging HMR
      },
      onListening: function (devServer) {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }

        const port = devServer.server.address().port;
        console.log("Listening on port:", port);
      },
      watchFiles: [path.resolve(__dirname, "src/**/*")],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
