var gulp = require('gulp');
var plumber = require('gulp-plumber');

// JS
var uglify = require('gulp-uglify');

// CSS
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// UTIL
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var paths = {
    src  : {
        js  : 'src/js',
        less: 'src/less'
    },
    dist : {
        js : 'dist/js',
        css: 'dist/css'
    },
    bower: {
        jquery: 'bower_components/jquery/dist/jquery.min.js'
    }
};

//////////////////////////////////////////////////
// JS Tasks
//////////////////////////////////////////////////

gulp.task('js:build', function () {
    return gulp.src([
        paths.bower.jquery,
        paths.src.js + '/utils.js',
        paths.src.js + '/plugin.*.js',
        paths.src.js + '/app.js'
    ])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
});

//////////////////////////////////////////////////
// CSS Tasks
//////////////////////////////////////////////////

gulp.task('css:less', function () {
    return gulp.src([
        paths.src.less + '/**/*.less'
    ])
        .pipe(plumber())
        .pipe(less({}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('css:build', ['css:less'], function () {
    return gulp.src(paths.dist.css + '/main.css')
        .pipe(plumber())
        .pipe(minifycss({keepBreaks: false}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(paths.dist.css));
});

//////////////////////////////////////////////////
// BUILD Tasks
//////////////////////////////////////////////////

gulp.task('build', ['js:build', 'css:build']);

//////////////////////////////////////////////////
// WATCH Tasks
//////////////////////////////////////////////////

gulp.task('default', function () {
    gulp.watch(paths.src.less + '/**/*.less', ['css:build']);
    gulp.watch(paths.src.js + '/**/*.js', ['js:build']);
});

