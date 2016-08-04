import gulp from 'gulp';
import runSequence from 'run-sequence';
import { argv } from 'yargs';

gulp.task('build', (cb) => {
  const executeTasks = [
    'clean',
    ...argv.production ? ['webpack'] : []
  ];

  runSequence(...executeTasks, cb);
});
