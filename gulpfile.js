const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const util = require('gulp-util');

gulp.task('scripts', function() {
    gulp.src(['./src/summarize.js'])
        .pipe(babel())
        .pipe(util.env.minify ? concat('summarize.min.js') : concat('summarize.js'))
        .pipe(util.env.minify ? uglify() : util.noop())
        .on('error', util.log)
        .pipe(gulp.dest('./dist/'));
});
