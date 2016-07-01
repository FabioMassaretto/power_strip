var webpack = require('webpack');

// TODO sourcemaps with webpack


module.exports = {
  entry: './public/index.js',

  output: {
    filename: './public/bundle.js',
    publicPath: '/public'
  },

  module: {
    loaders: [
      { 
        test: /.jsx?$/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets:['es2015', 'react']
        }
      }
    ]
  }
}