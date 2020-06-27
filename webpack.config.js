const path = require("path");

module.exports = {
  mode: "production",
  entry: ["./src/scripts/App.ts"],
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
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
};
