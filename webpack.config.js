var webpack = require('webpack');
var plugins = [];

plugins.push(new webpack.EnvironmentPlugin('TITO_ACCESS_TOKEN'));

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  );
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.png$/,
        loader: 'file',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\/api\//,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    modulesDirectories: ['app', 'node_modules'],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        pathRewrite: {'^/api': ''},
      },
    },
  },
  plugins: plugins,
};
