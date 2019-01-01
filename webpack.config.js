module.exports = {
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ["/node_modules/"],
        loader: "babel-loader"
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "-",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    filename: "[name].js"
  }
};
