const path = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/index.jsx'),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['transform-react-jsx'],
          presets: [
            ['env', {modules: false}]
          ]}
      },
      include: path.resolve(__dirname, 'src')
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    new ExtractTextPlugin('../css/bundle.min.css'),
    new UglifyJSPlugin({
      parallel: true
    })
  ]
}
