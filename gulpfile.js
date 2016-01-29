var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('connect', function(){
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('sass', function () {
  return gulp.src('sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['babel']);
  gulp.watch('sass/styles.scss', ['sass']);
});

gulp.task('dev', ['sass', 'watch']);