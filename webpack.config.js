const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const markdownRenderer = require('react-markdown-reader').renderer;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackHandleCssInjectPlugin = require('./HtmlWebpackHandleCssInjectPlugin');

const THEME_PATH = 'src/less/themes';

const resolveToStaticPath = relative => filePath => path.resolve(__dirname, relative, filePath);
const resolveToThemeStaticPath = resolveToStaticPath(THEME_PATH);
const themeFileNameSet = fs.readdirSync(THEME_PATH);
const themePaths = themeFileNameSet.map(resolveToThemeStaticPath);
const getThemeName = fileName => path.basename(fileName, path.extname(fileName));

const iconPath = ['./node_modules/rsuite/styles', '../rsuite/styles'].map(relativePath =>
  path.resolve(__dirname, relativePath)
);

const { NODE_ENV, STYLE_DEBUG } = process.env;
const __PRO__ = NODE_ENV === 'production';

const extractLess = new ExtractTextPlugin('style.css');

const getStyleLoader = () => {
  const sourceMap = STYLE_DEBUG === 'SOURCE' ? '?sourceMap' : '';
  const loaders = ['css-loader', 'postcss-loader', 'less-loader'];
  const filterLoader = loader =>
    STYLE_DEBUG === 'STYLE' || __PRO__ ? true : loader !== 'postcss-loader';
  return loaders.filter(filterLoader).map(loader => ({
    loader: `${loader}${sourceMap}`
  }));
};

const themesExtractLessSet = themeFileNameSet.map(fileName => new ExtractTextPlugin(`${getThemeName(fileName)}.css`))
const themeLoaderSet = themeFileNameSet.map((fileName, index) => {
  return {
    test: /\.(less|css)$/,
    include: resolveToThemeStaticPath(fileName),
    loader: themesExtractLessSet[index].extract({
      use: getStyleLoader()
    })
  }
});

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3200
  },
  entry: {
    polyfills: './src/polyfills.js',
    app: './src/index.js',
    themes: './src/themes.js'
  },
  output: {
    filename: '[name].bundle.js?[hash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'transform-loader?brfs', // Use browserify transforms as webpack-loader.
          'babel-loader?babelrc'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        exclude: themePaths,
        loader: extractLess.extract({
          use: getStyleLoader(),
          // use style-loader in development
          fallback: 'style-loader?{attrs:{prop: "value"}}'
        })
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              renderer: markdownRenderer
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        //`publicPath`  only use to assign assets path in build
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        include: iconPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              size: 16,
              hash: 'sha512',
              digest: 'hex',
              name: 'resources/[hash].[ext]',
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: iconPath,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      },
      ...themeLoaderSet
    ]
  },
  plugins: [
    extractLess,
    ...themesExtractLessSet,
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'RSUITE | 一套 React 的 UI 组件库',
      template: 'src/index.html',
      inject: true,
      hash: true,
      excludeChunks: ['themes']
    }),
    new HtmlWebpackHandleCssInjectPlugin({
      filter: (filePath) => {
        return filePath.includes('style');
      }
    })
  ],
  devtool: STYLE_DEBUG === 'SOURCE' && 'source-map'
};
