module.exports = function html() {
	return gulp.src(src.files.html)
	.pipe(gulp.dest(app.dir))
	.pipe(browserSync.stream());
};