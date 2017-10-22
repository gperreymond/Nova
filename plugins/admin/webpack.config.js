const path = require('path')

const Dotenv = require('dotenv-webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './app/index.jsx'),
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
      include: path.resolve(__dirname, 'app')
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, '.env')
    }),
    new ExtractTextPlugin('../css/bundle.min.css')
  ]
}
