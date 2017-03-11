/**
 * Created by r.dinca on 09/03/17.
 */


var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream'),
    watch = require('gulp-watch');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: "./build/",
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        files: ['./app']
    });

    gulp.watch("./src/**/*.js").on('change', browserSync.reload);
});

gulp.task('inject-files', function(){
    var cssFiles = gulp.src('./src/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./build'));

    var cssBootstrap = gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
        .pipe(stylus())
        .pipe(gulp.dest('./build'));

    gulp.src('./index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(es.merge(
            cssFiles,
            cssBootstrap,
            gulp.src('./src/**/*.js', {read: false})
        )))
        .pipe(gulp.dest('./build'));
});



gulp.task('default', ['inject-files', 'browser-sync'], function(){

});