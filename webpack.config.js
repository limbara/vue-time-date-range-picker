const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

$momentLocale = [
  'af',
  'ar',
  'en',
  'es',
  'fi',
  'fr',
  'he',
  'hi',
  'id',
  'it',
  'ja',
  'kn',
  'ko',
  'nl',
  'ms',
  'ru',
  'sk',
  'sr',
  'sv',
  'th',
  'tr',
  'uk',
  'ur',
  'vi',
  'zh-cn',
]

module.exports = {
  mode: 'production',
  entry: {
    DatePicker: './src/Components/DatePicker.vue',
    CalendarDialog: './src/Components/CalendarDialog.vue',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: $momentLocale,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
  ],
};