//  Require Modules
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer')
    del = require('del');

//Tasks
//Compress Javascript files
gulp.task('compress-js', function() {
    return gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
    //.pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream:true}));
});

//Compile Sass into Css
gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
    //.pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    //uglify css
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});

//Html task
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
    .pipe(reload({stream:true}));
});

//Sync the browser
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

//Watch task
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/js/**/*.js', ['compress-js']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
});

//Default task
gulp.task('default', ['watch']);

//Build task
//Clean Build directory if it exists
gulp.task('build-clean', function(cb) {
    del([
        'build/**'
    ], cb);
});

//Create Build directory
gulp.task('build-copy', ['build-clean'], function() {
    return gulp.src('app/**/*')
    .pipe(gulp.dest('build'));
});

//Remove unwanted build files
gulp.task('build-remove', ['build-copy'], function(cb) {
    del([
        'build/scss',
        'build/js/!(*.min.js)'
    ], cb);
});

//Build
gulp.task('build', ['build-copy', 'build-remove']);

//Show Build Version
gulp.task('build-serve', function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });
});
