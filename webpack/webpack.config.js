var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {

  context: process.cwd(),

  mode: 'development',

  target: 'web',

  devtool: 'inline-source-map',

  entry: {
    default: './src/index.js',
  },

  output: {
    filename: '[name].bundle.js',
  },

  plugins: [
    // new BundleTracker({ indent: ' ', filename: './webpack-stats.json' }),
    // new CleanWebpackPlugin(
    //   ['./probex/static/probex/bundles/'],
    //   { root: process.cwd() }
    // ),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery'
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
          plugins: ["transform-object-rest-spread"]
        }
      },
      // IMAGES
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
      },
      // FONTS
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      // LESS/CSS
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },

  watchOptions: {
    ignored: /node_modules/,
    poll: true
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
