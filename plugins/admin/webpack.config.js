const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, './app/index.jsx'),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [
        'babel-loader'
      ],
      include: path.resolve(__dirname, 'app')
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  }
}
