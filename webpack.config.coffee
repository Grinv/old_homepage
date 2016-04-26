webpack = require "webpack"
ExtractTextPlugin = require 'extract-text-webpack-plugin'
extractCSS = new ExtractTextPlugin '../build/[name].css'
module.exports =
    entry: "./src/entry.coffee"
    output:
        path: __dirname + "/build"
        filename: "main.js"
    module:
        loaders: [
            {
              test: /\.css$/
              loader: extractCSS.extract "style-loader", "css-loader"
            }
            {
              test: /\.scss$/i
              loader: extractCSS.extract ['css','sass']
            }
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/
              loader: "url?limit=10000&minetype=application/font-woff"
            }
            {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/
              loader: "url?limit=10000&mimetype=application/octet-stream"
            }
            {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/
              loader: "file"
            }
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/
              loader: "url?limit=10000&mimetype=image/svg+xml"
            }
            {
              test: /\.(jpe?g|png|gif|svg)$/i
              loader: 'url?limit=10000!img?progressive=true'
            }
            {
              test: /\.coffee$/
              loader: "coffee-loader"
            }
            {
              test: /\.(coffee\.md|litcoffee)$/
              loader: "coffee-loader?literate"
            }
        ]
    amd:
      jQuery: true
    plugins: [
      new webpack.optimize.UglifyJsPlugin
        compress:
          warnings: false
      new webpack.ProvidePlugin
        "$": "jquery"
        "jquery": "jQuery"
        "windows.jQuery": "jquery"
      extractCSS
    ]
