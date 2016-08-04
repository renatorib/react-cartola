import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from '../config/webpack';

gulp.task('webpack', (cb) => {
  return webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }));

    cb();
  });
});
