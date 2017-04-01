var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: {
      dev: ['./demo/App.js'], // dev version includes a host application to demonstrate the component
      dist: ['./src/chessdiagram.js'] // dist version is component only
    },
    output: {
      path: path.join(__dirname, '/build/'),
      filename: '[name].chessdiagram.js', // will be 'dev.chessdiagram.js' and 'dist.chessdiagram.js'
      publicPath: '/',                     // ./build => http://localhost:port/
    },

    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.css$/,
          loaders: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        }
      ]
    },
};
