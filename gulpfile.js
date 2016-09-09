var gulp = require('gulp')
    babel = require('gulp-babel')
    nodemon = require('gulp-nodemon')
    sourcemaps = require('gulp-sourcemaps');

// -- DIRECTORIES --
var dest = 'build';
var src = 'build-src';

// -- TASKS --
gulp.task('libs', function() {

    gulp.src([
        'node_modules/babel-polyfill/dist/polyfill.js',
        'node_modules/systemjs/dist/system.js'
    ])
        .pipe(gulp.dest(dest + '/lib'))
});

gulp.task('js', function() {

    gulp.src(src + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest))
});

gulp.task('build', ['libs', 'js'], function() {

    gulp.src([src + '/**/*.html', src + '/**/*.css'])
        .pipe(gulp.dest(dest))
});
