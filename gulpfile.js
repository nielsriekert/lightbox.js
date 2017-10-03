//plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	babel = require('gulp-babel');

//tasks
gulp.task('styles', function() {
	return gulp.src('src/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 3 version'))
		.pipe(concat('lightbox.min.css'))
		.pipe(sourcemaps.write('test/maps'))
		.pipe(gulp.dest('.'));
});

gulp.task('scripts', function() {
	return gulp.src(['src/lightbox.js'])
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env'],
		}))
		.pipe(uglify())
		.pipe(concat('lightbox.min.js'))
		.pipe(sourcemaps.write('test/maps'))
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