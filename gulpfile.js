'use strict'

var gulp = require('gulp');
var babel = require('gulp-babel');
var process = require("child_process");
var sourcemaps = require('gulp-sourcemaps');
var path = require("path");
const notifier = require('node-notifier');

gulp.task('babel-compile', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015-without-regenerator'],
            plugins: ['transform-async-to-generator']
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['babel-compile'],function(){
    notifier.notify({
        title:'gulp watch',
        message:'compile success',
        wait:false,
        icon:path.resolve(__dirname,'siren','de39b88d-2485-4ef4-8a24-06623b3113c5.jpeg')
    });
});

gulp.task('watch', function () {
    gulp.watch("src/**/*.js",["default"]);
    // gulp.watch("src/**/*.js", function (event) {
    //     if (event.type === "changed") {
    //         process.exec(`xg lint ${event.path}`, (error, stdout, stderr) => {
    //             console.info(`stdout: ${stdout}`);
    //         });
    //     }
    // });
})