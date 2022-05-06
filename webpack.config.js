const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  //   mode: "development",
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"), // dir pour notre index.html
    }),
  ],
  devServer: {
    port: 3000,
    open: true, // ouverture de l'app au lancement du server
    hot: true, // hot-reload
    historyApiFallback: true, // permet de faire pseudo-routing(#routing)(ajout dansl le stack history)
  },
};
