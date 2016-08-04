import { argv } from 'yargs';
import { dir } from './app';
import { optimize, NoErrorsPlugin, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import packageJson from '../package.json';
import postcssConfig from './postcss';

const ENV_DEV = 'dev';
const ENV_PROD = 'production';
const IS_DEVELOPMENT = !argv.production;
const ENV = IS_DEVELOPMENT ? ENV_DEV : ENV_PROD;

const applyByEnv = (obj) => obj[ENV];

let config = {
  devtool: IS_DEVELOPMENT ? 'cheap-module-eval-source-map' : 'source-map',
  context: dir.root,
  entry: {
    main: `${dir.app.root}/main.js`,
    vendor: Object.keys(packageJson.dependencies)
  },
  output: {
    filename: IS_DEVELOPMENT ? 'scripts/[name].js' : 'scripts/[name].[chunkhash].js',
    path: dir.build,
    publicPath: '/'
  },
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: dir.nodeModules
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          `css?${JSON.stringify({
            sourceMap: IS_DEVELOPMENT,
            minimize: !IS_DEVELOPMENT
          })}!postcss`
        ),
        include: dir.stylesheets
      }
    ]
  },
  resolve: {
    root: dir.root,
    extensions: ['', '.js', '.css', '.json'],
    moduleDirectories: [dir.nodeModules],
    alias: {
      'config': `${dir.config}/environment/${ENV}`,
      'app': dir.app.root,
      'actions': dir.app.actions,
      'components': dir.app.components,
      'constants': dir.app.constants,
      'layouts': dir.app.layouts,
      'reducers': dir.app.reducers,
      'utils': dir.app.utils,
      'views': dir.app.views,
      'stylesheets': dir.stylesheets
    }
  },
  plugins: [
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new StatsPlugin('build-stats.json', { chunkModules: true }),
    new ExtractTextPlugin('stylesheets/[name].css', { allChunks: true }),
    new DefinePlugin({
      'process.env': {
        'ENVIRONMENT': JSON.stringify(ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: `${dir.assets}/index.html`
    }),
    new WriteFileWebpackPlugin({
      test: /^((?!hot-update).)*.(js|css|html)$/,
      useHashIndex: true
    }),

    ...applyByEnv({
      [ENV_DEV]: [
        new NoErrorsPlugin(),
        new HotModuleReplacementPlugin()
      ],
      [ENV_PROD]: [
        new optimize.DedupePlugin(),
        new optimize.UglifyJsPlugin({
          sourceMap: false,
          mangle: false,
          compress: {
            warnings: false
          }
        }),
        new optimize.AggressiveMergingPlugin()
      ]
    })
  ],
  postcss: postcssConfig
};

if (IS_DEVELOPMENT) {
  config = Object.assign(config, {
    historyApiFallback: true,
    cache: true,
    debug: true,
  });

  config.entry.hotreload = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ]
}

export default config;
