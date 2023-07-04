const path = require("path")

const webpack = require("webpack")
const cesiumSource = "node_modules/cesium/Source"
const cesiumWorkers = "../Build/Cesium/Workers"
const CopywebpackPlugin = require("copy-webpack-plugin")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  context: __dirname,
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    sourcePrefix: "",
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true,
  },

  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer/"),
      https: false,
      buffer: false,
      stream: false,
      url: false,
    },
    alias: {
      // CesiumJS module name
      cesium: path.resolve(__dirname, cesiumSource),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // Strip cesium pragmas
        test: /\.js$/,
        enforce: "pre",
        include: path.resolve(__dirname, cesiumSource),
        use: [
          {
            loader: "strip-pragma-loader",
            options: {
              pragmas: {
                debug: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopywebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
        { from: path.join(cesiumSource, "Assets"), to: "Assets" },
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  devtool: "eval",
}
