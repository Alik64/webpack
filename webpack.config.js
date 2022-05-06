const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        // affectation passe de droite vers la gauche [(2) style <= (1) css]
        use: [
          NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                auto: /\.module\.\w+$/,
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"), // dir pour notre index.html
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/favicon.ico"),
          to: path.resolve(__dirname, "dist/favicon.ico"),
        },
      ],
    }),
  ].concat(NODE_ENV === "production" ? [new MiniCssExtractPlugin()] : []),
  devServer: {
    port: 3000,
    open: true, // ouverture de l'app au lancement du server
    hot: true, // hot-reload
    historyApiFallback: true, // permet de faire pseudo-routing(#routing)(ajout dans le stack history)
  },
};
