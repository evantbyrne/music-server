const path = require("path");
const MiniCssExtract = require("mini-css-extract-plugin");
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      "./frontend/js/index.js",
      "./frontend/scss/index.scss",
    ],
  },

  output: {
    path: path.resolve(__dirname, 'frontend/dist'),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: "babel-loader"
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtract.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtract({
      path: path.resolve(__dirname, 'frontend/dist'),
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new Uglify(),
  ],
};
