var gulp = require('gulp'),
    stylus = require('gulp-stylus');

gulp.task('stylus', function () {
  gulp.src('./css/nib/*.styl')
    .pipe(stylus({
      use: ['nib'],
      import: ['nib']
    }))
    .pipe(gulp.dest('./css/'));
});
