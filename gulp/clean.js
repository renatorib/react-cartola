import gulp from 'gulp';
import del from 'del';
import { dir } from '../config/app';

gulp.task('clean', (cb) => del(dir.build, cb));
