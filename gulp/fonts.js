const ttf2woff = require('gulp-ttf2woff'),
	// cssfont64 = require('gulp-cssfont64'),
	fonts2css = require('gulp-fonts2css');

const
	gcmq = require('gulp-group-css-media-queries'),
	shorthand = require('gulp-shorthand'),
	purgecss = require('gulp-purgecss'),
	csso = require('gulp-csso'),
	cleanCSS = require('gulp-clean-css');

module.exports = function fonts() {
	let p = gulp.src(src.files.fonts)
	.pipe(ttf2woff())
	.pipe(fonts2css());
	if(production) {
		p = p
		// .pipe(gcmq())
		// .pipe(purgecss({
		// 	content: [app.files.html],
		// 	fontFace: true
		// }))
		// .pipe(shorthand())
		.pipe(cleanCSS({
			level: {
				2: {
					all: true
				}
			}
		}))
		// .pipe(csso())
		;
	}
	return p.pipe(gulp.dest(app.css))
	.pipe(browserSync.stream());
};