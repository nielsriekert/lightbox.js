//plugins
var gulp = require('gulp'),
	sass = require('gulp-sass')
	autoprefixer = require('gulp-autoprefixer')
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),

//tasks
gulp.task('styles', function() {
	return gulp.src('src/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 3 version'))
		.pipe(gulp.dest('.'));
});

gulp.task('scripts', function() {
	return gulp.src(['src/js/utils.js', 'src/js/menu.js', 'src/js/carousel.js', 'src/js/lightbox.js'])
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('./js'));
});

gulp.task('watch', ['styles', 'scripts'], function() {
	gulp.watch('src/*.scss', ['styles']);
	gulp.watch('src/*.js', ['scripts']);
});

gulp.task('default', ['watch']);