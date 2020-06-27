const path = require('path');
const fs = require('fs');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const files = fs.readdirSync(path.join(__dirname, 'src', 'Locales', 'Translations'));

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
];

const translations = files.map((file) => ({
  mode: isProduction ? 'production' : 'development',
  entry: path.join(__dirname, 'src', 'Locales', 'Translations', file),
  output: {
    path: path.join(__dirname, 'dist', 'Locales', 'Translations'),
    filename: `${file}`,
  },
  module: {
    rules,
  },
}));

const translationsIndex = {
  mode: isProduction ? 'production' : 'development',
  entry: path.join(__dirname, 'src', 'Locales', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist', 'Locales'),
    filename: 'index.js',
  },
  module: {
    rules,
  },
};

const main = {
  mode: isProduction ? 'production' : 'development',
  entry: path.join(__dirname, 'src', 'Components', 'index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: rules.concat([
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
          'sass-loader',
        ],
      },
    ]),
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = translations.concat(translationsIndex).concat(main);
