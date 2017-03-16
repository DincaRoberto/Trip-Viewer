/**
 * Created by r.dinca on 09/03/17.
 */


var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    bowerFiles  = require('main-bower-files'),
    inject      = require('gulp-inject'),
    stylus      = require('gulp-stylus'),
    es          = require('event-stream'),
    watch       = require('gulp-watch'),
    connect     = require('gulp-connect-php'),
    jimp        = require("gulp-jimp-resize");

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: '127.0.0.1:8000',
        startPath: "./build/",
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        files: ['./app']
    });

    gulp.watch(["./src/**/*.js", "./src/**/*.html"], ['inject-files']).on('change', browserSync.reload);
});

gulp.task('inject-files', function(){
    var cssFiles = gulp.src('./src/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./build'));

    var htmlFiles = gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build'));

    var cssBootstrap = gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css');

    gulp.src('./index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(es.merge(
            cssFiles,
            htmlFiles,
            cssBootstrap,
            gulp.src('./src/**/*.js', {read: false})
        )))
        .pipe(gulp.dest('./build'));
});

gulp.task('images', function() {
    return gulp.src(
         ['./trips/**/*.{png,jpg,bmp}', '!./trips/**/*-md.{png,jpg,bmp}']
    )
        .pipe(jimp({
            sizes: [
                {"suffix": "md", "width": 100}
            ]
        }))
        .pipe(gulp.dest('./md/'));
});

gulp.task('connect', function() {
    connect.server();
});



gulp.task('default', ['inject-files', 'connect', 'browser-sync'], function(){

});