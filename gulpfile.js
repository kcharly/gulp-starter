// Configuration variables
var config = {
    buildFilesFoldersRemove: [
        'build/scss',
        'build/js/!(*.min.js)',
        'build/bower_components'
    ],
    jsFilesCompress: [
        'app/bower_components/jquery/dist/jquery.js',
        'app/js/**/*.js',
        '!app/js/**/*.min.js'
    ]
};

//  Required Modules
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

// Log Errors - simple function to remplace the use of gulp-plumber
function errorlog(err) {
    console.log(err.message);
    this.emit('end');
}

//General Tasks
//Compress Javascript files
gulp.task('compress-js', function() {
    return gulp.src(config.jsFilesCompress)
    .pipe(uglify())
    .on('error', errorlog)
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream:true}));
});

//Compile Sass into Css
gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', errorlog)
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});

//Html task
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
    .pipe(reload({stream:true}));
});

//Syncronisations Tasks
//Sync the browser during development
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

// //Show Build Version in browser
// gulp.task('build-serve', function() {
//     browserSync({
//         server: {
//             baseDir: 'build'
//         }
//     });
// });

// //Build task
// //Clean Build directory if it exists
// gulp.task('build-clean', function(cb) {
//     del([
//         'build/**'
//     ], cb);
// });
//
// //Create Build directory
// gulp.task('build-copy', ['build-clean'], function() {
//     return gulp.src('app/**/*')
//     .pipe(gulp.dest('build/'));
// });
//
// //Remove unwanted build files
// gulp.task('build-remove', ['build-copy'], function(cb) {
//     del(config.buildFilesFoldersRemove, cb);
// });
//
// //Build
// gulp.task('build', ['build-copy', 'build-remove']);


//Watch task
gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', ['compress-js']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['html']);
});

//Default task
gulp.task('default', ['compress-js', 'sass', 'html', 'browserSync', 'watch']);
