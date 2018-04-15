//plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	babel = require('gulp-babel');

//tasks
gulp.task('styles', function() {
	return gulp.src('src/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer('last 3 version'))
		.pipe(concat('vanillelightbox.css'))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
	return gulp.src(['src/vanillelightbox.js'])
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env'],
		}))
		.pipe(concat('vanillelightbox.js'))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('./dist'));
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