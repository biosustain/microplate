var gulp = require('gulp');
var babel = require('gulp-babel');
var tsc = require('gulp-typescript');
var typescript = require('typescript');

gulp.task('dist', function () {
    return gulp.src(['./src/*.js'])
        .pipe(tsc({
            target: 'ES5',
            module: 'commonjs',
            // Don't use the version of typescript that gulp-typescript depends on, we need 1.5
            // see https://github.com/ivogabe/gulp-typescript#typescript-version
            typescript: require('typescript')}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['dist']);