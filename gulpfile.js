//plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint');

//tasks
gulp.task('styles', function() {
	return gulp.src('src/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 3 version'))
		.pipe(concat('lightbox.min.css'))
		.pipe(gulp.dest('.'));
});

gulp.task('scripts', function() {
	return gulp.src(['src/lightbox.js'])
		.pipe(uglify())
		.pipe(concat('lightbox.min.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('lint', function() {
	return gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

gulp.task('watch', ['styles', 'scripts'], function() {
	gulp.watch('src/*.scss', ['styles']);
	gulp.watch('src/*.js', ['lint', 'scripts']);
});

gulp.task('default', ['watch']);