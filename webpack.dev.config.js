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
        loaders: [
            { 
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
};