import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import stripAnsi from 'strip-ansi';
import { argv } from 'yargs';
import { dir } from '../config/app';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../config/webpack';

const bs = browserSync.create();

const webpackBundler = ({ onSuccess, onError }) => {
  const bundler = webpack(webpackConfig);

  bundler.plugin('done', (stats) =>
    (stats.hasErrors() || stats.hasWarnings()) ? onError(stats) : onSuccess());

  return bundler;
}

const bundler = webpackBundler({
  onSuccess: () => null,
  onError: (stats) => bs.sockets.emit('fullscreen:message', {
    title: 'Webpack Error:',
    body: stripAnsi(stats.toString()),
    timeout: 100000
  })
});

const browserSyncOpts = {
  open: !!argv.open,
  notify: !!argv.notify,
  logFileChanges: false,
  server: {
    baseDir: dir.build,
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          chunks: false,
          chunkModules: false
        }
      }),
      webpackHotMiddleware(bundler)
    ]
  },
  plugins: ['bs-fullscreen-message'],
  files: [
    'app/*.js',
    'app/css/*.css',
    'app/*.html'
  ]
};

gulp.task('browser-sync', () => bs.init(browserSyncOpts));
