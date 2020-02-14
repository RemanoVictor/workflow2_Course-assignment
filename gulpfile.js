const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const {src,dest} = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();

function css(){
	return src('./stylesheets/sass/**/*.scss')
	.pipe(sass())
	.pipe(minifyCSS())
	.pipe(dest('./dist/css'))
	.pipe(browserSync.stream())
}

function images(){
	return src('images/**/*')
	.pipe(imagemin())
	.pipe(dest('./dist/images_min'))
};

function moveHTML(){
	return src('./*.html')
	.pipe(dest('./dist'))
};


function watch(){
	browserSync.init({
		server:{
			baseDir:'./dist'
		}
	});
	gulp.watch('./stylesheets/sass/**/*.scss',css);
	gulp.watch('./*.html',moveHTML);
	gulp.watch('*.html').on('change',browserSync.reload);



}

exports.watch = watch;
exports.minimages = images;


