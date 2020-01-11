const
	svgmin = require('gulp-svgmin'),
	svgless = require('gulp-svg-less');

module.exports = function inlineSvg() {
	return gulp.src(src.files.svg)
	.pipe(svgmin())
	.pipe(svgless({ 
		fileName: '_inline_svg',
		mixinPrefix: 'inline_svg_',
		outputMixin: true, // ?
		addSize: false
	}))
	.pipe(gulp.dest(src.less + 'auto/'));
};