var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('dist', function () {
    return gulp.src(['./src/*.js'])
        .pipe(babel({
            modules: 'common',
            optional: ['runtime'],
            stage: 0
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['dist']);