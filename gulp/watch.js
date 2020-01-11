module.exports = function watch() {
	browserSync.init({
		server: {
			baseDir: app.dir
		}
	});

	gulp.watch(src.files.less, styles);
	gulp.watch(src.files.js, scripts);
	gulp.watch(src.files.html, html);
	gulp.watch(src.files.fonts, fonts);
	gulp.watch(src.files.svg, inlineSvg);
	gulp.watch(src.files.sprite, sprite);
	gulp.watch([src.files.img, '!' + src.files.icons], img);
	// gulp.watch(app.files.html).on('change', browserSync.reload);
};