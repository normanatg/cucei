'use strict';
var gulp = require('gulp-param')(require('gulp'), process.argv);
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var exec = require('gulp-exec');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var connect = require("gulp-connect");
var inject = require("gulp-inject");
var gulpNgConfig = require('gulp-ng-config');
var rename = require("gulp-rename");
var replace = require('gulp-replace');



gulp.task('connect', function() {
    connect.server({
        port: 8008,
        livereload: true
    });
});

gulp.task('styles', function () {
    gulp.src(['./assets/**/*.scss', './app/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist'));
});
gulp.task('inject', function () {
    var target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./app/**/*.js'],['./dist/**/*.css'], {read: false});


    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});

gulp.task('default',['connect','inject'], function () {
    gulp.watch('./app/**/*.scss', ['styles']);
    gulp.watch('./assets/sass/**/*.scss', ['styles']);
});