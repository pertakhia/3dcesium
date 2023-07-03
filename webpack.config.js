const path = require("path")

const webpack = require("webpack")
const cesiumSource = "node_modules/cesium/Source"
const cesiumWorkers = "../Build/Cesium/Workers"

const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
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
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
        { from: path.join(cesiumSource, "Assets"), to: "Assets" },
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
        { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
      ],
    }),

    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets

      CESIUM_BASE_URL: JSON.stringify(""),
    }),
  ],
}
