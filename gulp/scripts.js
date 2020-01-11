const
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

module.exports = function scripts() {
	function jsPipes(src, name, dest) {
		let p = gulp.src(src)
		// .pipe(plumber())
		// .pipe(babel({
		// 	presets: ['env', 'es2015']
		// }))
		.pipe(concat(name));
		if(production) {
			p = p
				.pipe(uglify({
					toplevel: true
				}))
		}
		return p.pipe(gulp.dest(dest));
	}

	jsPipes(src.js + 'defer/**/*.js', 'defer.js', app.js);
	return jsPipes([src.files.js, '!' + src.js + 'defer/**/*.js'], 'common.js', app.js)
		.pipe(browserSync.stream());
};