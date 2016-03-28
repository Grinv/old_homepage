var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('../build/[name].css');
module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname + "/build",
        filename: "main.js"
    },
    resolve: {
      alias: {
        jquery: "./jquery.min",
        fullpage: "./jquery.fullPage.min"
      },
      modulesDirectories: ["web_modules", "node_modules", "src/js"]
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: extractCSS.extract("style-loader", "css-loader")
            },
            {
              test: /\.scss$/i,
              loader: extractCSS.extract(['css','sass'])
            },
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "url?limit=10000&minetype=application/font-woff"
            },
            {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file"
            },
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: 'url?limit=10000!img?progressive=true'
            }
        ]
    },
    amd: {
      jQuery: true
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jQuery",
        "windows.jQuery": "jquery"
      }),
      extractCSS
    ]
};
