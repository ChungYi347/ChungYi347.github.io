const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const loaders = {
  html: {
    loader: 'html-loader',
  },
  babel: {
    loader: 'babel-loader',
    options: {
      compact: false,
      cacheDirectory: !prod,
    },
  },
  style: [prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
};

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'eval-source-map',
  entry: {
    app: resolve(__dirname, 'src/index'),
  },
  resolve: {
    modules: ['node_modules'],
    mainFiles: ['index'],
    extensions: ['.js', '.mjs', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [loaders.html],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [loaders.babel],
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: loaders.style,
      },
      {
        // webpack 5 네이티브 asset 모듈. 8KB 미만은 data URI, 그 이상은 파일로 방출한다.
        // (url-loader 는 deprecated 이고 webpack 5 에서 에셋 방출이 불안정하다)
        test: /\.(jpe?g|png|gif|bmp|webp|avif)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        generator: { filename: 'static/media/[name].[contenthash:8][ext]' },
      },
      {
        // 동영상은 인라인하지 않고 항상 별도 파일로 (스트리밍 가능해야 함)
        test: /\.(mp4|webm)$/,
        type: 'asset/resource',
        generator: { filename: 'static/media/[name].[contenthash:8][ext]' },
      },
      {
        // SVG 는 URL 로만 다룬다. React 컴포넌트가 필요한 아이콘은 JSX 로 인라인했다
        // (svgr 의 default/named 이중 export 는 dev/prod 동작이 갈려 깨지기 쉽다)
        test: /\.svg$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        generator: { filename: 'static/media/[name].[contenthash:8][ext]' },
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: 'index.html',
      favicon: 'favicon.ico',
      minify: {
        collapseWhitespace: true,
      },
    }),
    // OG 이미지, robots.txt 등 해시가 붙으면 안 되는 정적 파일을 그대로 복사한다
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.', noErrorOnMissing: true }],
    }),
    ...(prod
      ? [
          new CleanWebpackPlugin(),
          new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          }),
        ]
      : []),
  ],
  optimization: {
    minimize: prod,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          safari10: true,
        },
      }),
    ],
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[id].[contenthash:8].chunk.js',
  },
};
