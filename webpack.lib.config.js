const path = require("path");

module.exports = {
  entry: path.resolve("src", "library.js"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/react"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    library: "react-phylotree",
    libraryTarget: "commonjs2",
    filename: "bundle.js"
  }
};
