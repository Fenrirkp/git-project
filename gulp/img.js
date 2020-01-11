const
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

module.exports = function img() {
	let p = gulp.src([src.files.img, '!' + src.files.icons]);
	if(production) {
		p = p.pipe(cache(imagemin({
				interlaced: true,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			})));
	}
	return p.pipe(gulp.dest(app.img))
	.pipe(browserSync.stream());
};

// gulp.task('img:watch', ['img'], function() {
// 	return global.browserSync.reload('*.jpg','*.JPG','*.jpeg','*.JPEG','*.png','*.gif');
// });