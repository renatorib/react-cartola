import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('server', (cb) => runSequence(
  'build',
  'watch',
  'browser-sync',
  cb
));
