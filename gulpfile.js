var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');
var gutil       = require('gulp-util');
var reload      = browserSync.reload;

var SRC         = './src/';
var SRC_JADE    = SRC + '**/!(_)*.jade';
var SRC_SCSS    = SRC + 'sass/**/*.scss';

var DEST        = './../htdocs/tools/';
var DEST_JADE   = DEST;
var DEST_SCSS   = DEST + 'css';

var WATCH_JADE  = SRC + '**/*.jade';

gutil.log(SRC_JADE);

/**
 * Compile jade files into HTML
 */
gulp.task('templates', function() {

    var YOUR_LOCALS = {};

    return gulp.src(SRC_JADE)
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(DEST_JADE))
});

/**
 * Important!!
 * Separate task for the reaction to `.jade` files
 */
gulp.task('jade-watch', ['templates'], reload);

/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
    return gulp.src(SRC_SCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(DEST_SCSS))
        .pipe(reload({stream: true}));
});

/**
 * Serve and watch the scss/jade files for changes
 */
gulp.task('default', ['sass', 'templates'], function () {

    browserSync.init({proxy: "http://local.superdevresources.dev/tools/", browser: "chrome"});

    gulp.watch(SRC_SCSS,      ['sass']);
    gulp.watch(WATCH_JADE,    ['jade-watch']);
});
