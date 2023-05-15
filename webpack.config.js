const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // точка входа вашего приложения
  output: {
    path: path.resolve(__dirname, "dist"), // путь к выходной директории
    filename: "bundle.js", // имя выходного файла
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }, 
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // путь к вашему шаблону HTML
    }),
  ],

  devServer: {
    compress: false,
    port: 3000,
  },
};
