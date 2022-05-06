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
    assetModuleFilename: "images/[name]__[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, // regex qui analyse les fichiers , si !(tsx,jsx,ts,js) => ignorer la vérification
        loader: "ts-loader",
        exclude: [/node_modules/], // pour éviter à transpiler les fichiers dans le dossier node_modules
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // affectation passe de droite vers la gauche [(2) style <= (1) css]
      },
      {
        test: /\.(png|jpe?g|gif|webp)/,
        type: "asset/resource",
      },
    ],
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
    historyApiFallback: true, // permet de faire pseudo-routing(#routing)(ajout dans le stack history)
  },
};
