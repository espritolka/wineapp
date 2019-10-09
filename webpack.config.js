
var path = require('path');
var webpack = require('webpack');
 module.exports = {
    entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    sourceMapFilename: "bundle.js.map"
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  devServer: {
    writeToDisk: true, 
  },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };