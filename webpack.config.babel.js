const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglify-js-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const publicPath = path.join(__dirname, 'public');

const DIST_DIR = "dist";

const config = {
  entry: ['babel-polyfill', 'whatwg-fetch', path.resolve(sourcePath, 'App.js')],
  output: {
    path: path.resolve(__dirname, DIST_DIR),
    filename: 'bundle.js',
    publicPath: ""
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath, 
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(hex-rgb))/,
        use: ['babel-loader'],
        include: [sourcePath, path.join(__dirname, 'node_modules', 'hex-rgb')]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ 
            use: 'css-loader',
            fallback: 'style-loader'
        })
      },
      {
        test: /\.html$/,
        use: [{
            loader: "html-loader",
            options: {
              minimize: true,
              attrs: [':img-src']
            }
        }]
      }
    ],
  },
  
  context: __dirname, // string (absolute path!),

  devServer: {
    //contentBase: [path.join(__dirname, 'public')], // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

  plugins: [
    

    //new ExtractTextPlugin(path.resolve(__dirname, 'public/styles/app.css')),
    new ExtractTextPlugin('styles.css'),

    new HtmlWebpackPlugin({   
        filename: 'index.html',
        template: path.join(__dirname, 'public', 'index.html')
    }),

    new CleanWebpackPlugin(['dist']),

  ],

  //devtool: "source-map", // enum
  //devtool: "inline-source-map", // inlines SourceMap into original file
  //devtool: "eval-source-map", // inlines SourceMap per module
  //devtool: "hidden-source-map", // SourceMap without reference in original file
  //devtool: "cheap-source-map", // cheap-variant of SourceMap without module mappings
  //devtool: "cheap-module-source-map", // cheap-variant of SourceMap with module mappings
  //devtool: "eval", // no SourceMap, but named modules. Fastest at the expense of detail.
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  );
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  config.plugins.push(new webpack.HashedModuleIdsPlugin());
}

module.exports = config;
