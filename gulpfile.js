var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade');

gulp.task('stylus', function () {
  gulp.src('./styl/*.styl')
    .pipe(stylus({
      use: ['nib'],
      import: ['nib']
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('templates', function() {
  gulp.src('./templates/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(gulp.dest('./js/templates'))
});
