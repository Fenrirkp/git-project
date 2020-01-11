const
	less = require('gulp-less'),
	gcmq = require('gulp-group-css-media-queries'),
	autoprefixer = require('gulp-autoprefixer'),
	// cssbeautify = require('gulp-cssbeautify'),
	shorthand = require('gulp-shorthand'),
	// plumber = require('gulp-plumber'),
	// base64 = require('gulp-base64-inline'),
	purgecss = require('gulp-purgecss'),
	csso = require('gulp-csso'),
	cleanCSS = require('gulp-clean-css');

// module.exports = function styles() {
// 	return gulp.src([src.files.less, '!' + src.less + '**/_*.less'])
// 	// .pipe(plumber())
// 	.pipe(less())
// 	.pipe(gcmq())
// 	.pipe(purgecss({
// 		content: [app.files.html],
// 		whitelistPatterns: [/^js-/, /^fkp-/, /^lg-/],
// 		// fontFace: true,
// 		keyframes: true
// 	}))
// 	// .pipe(base64('../img/'))
// 	.pipe(autoprefixer())
// 	.pipe(shorthand())
// 	// .pipe(cleanCSS({
// 	// 	level: {
// 	// 		2: {
// 	// 			all: true
// 	// 		}
// 	// 	}
// 	// }))
// 	.pipe(gulpif(production, csso()))
// 	// .pipe(csso())
// 	// .pipe(cssbeautify())
// 	.pipe(gulp.dest(app.css))
// 	.pipe(browserSync.stream());
// };

module.exports = function styles() {
	let p = gulp.src([src.files.less, '!' + src.less + '**/_*.less'])
	// .pipe(plumber())
	.pipe(less())
	.pipe(gcmq())
	.pipe(purgecss({
		content: [app.files.html],
		whitelistPatterns: [/^js-/, /^fkp-/, /^lg-/],
		// fontFace: true,
		keyframes: true
	}))
	// .pipe(base64('../img/'))
	.pipe(autoprefixer())
	.pipe(shorthand());

	if(production) {
		p = p
			.pipe(cleanCSS({
				level: {
					2: {
						all: true
					}
				}
			}))
			.pipe(csso());
	}
	return p
	// .pipe(cssbeautify())
	.pipe(gulp.dest(app.css))
	.pipe(browserSync.stream());
};