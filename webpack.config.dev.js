const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/scripts/App.ts"],
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  // devtool: "inline-source-map",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
};
