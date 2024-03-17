const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './index'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.(png|svg|jpg|jpeg|gif|woff(2)?)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  plugins: [
    new EslintPlugin({ extensions: 'ts' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      favicon: './src/assets/favicon.jpg',
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
