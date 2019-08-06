// including plugins
var gulp = require('gulp')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
// var less = require('gulp-less')
var path = require('path')

gulp.task('css', function(){
    return gulp.src(
            [
                './public/css/general_style.css',
                './public/css/main_style.css',
                './public/css/reset_style.css',
                './public/css/social-share-kit/social-share-kit.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./public/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})

gulp.task('copy-sharekit', function(){
    return gulp.src(
            ['./public/css/social-share-kit/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})

gulp.task('style', ['css', 'copy-fonts', 'copy-sharekit'], function(){})

gulp.task('js', function(){
    return gulp.src(
            [
                './public/js/jquery-1.12.4.min.js',
                './public/js/script.js',
                './public/js/social-share-kit/social-share-kit.min.js'
            ]
        )
        .pipe(gp_concat('vendor.min.js'))
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});

gulp.task('prod', ['style', 'js'], function(){})
gulp.task('default', ['style', 'js'], function(){})
