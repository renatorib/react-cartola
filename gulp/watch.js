import gulp from 'gulp';
import browserSync from 'browser-sync';
import { files } from '../config/app';

gulp.task('watch', () => {
  gulp.watch(files.html, ['copy-files:html']);
  gulp.watch(files.images, ['copy-files:images']);
});
