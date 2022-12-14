const gulp = require('gulp');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function () {
    return gulp.src("src/scss/*.scss")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('server', 'styles', 'watch'));