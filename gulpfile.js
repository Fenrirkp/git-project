// const requireDir = require('require-dir'),
// 	rename = require("gulp-rename");

global.production = true;
global.path = require('./gulp/_path');
global.src = path.src;
global.app = path.app;
global.gulp = require('gulp');
global.browserSync = require('browser-sync').create();

global.img = require('./gulp/img');
global.inlineSvg = require('./gulp/inlineSvg');
global.sprite = require('./gulp/sprite');
global.grid = require('./gulp/grid');
global.scripts = require('./gulp/scripts');
global.fonts = require('./gulp/fonts');
global.html = require('./gulp/html');
global.styles = require('./gulp/styles');
const watch = require('./gulp/watch');

const del = require('del');

function clean() {
	return del([app.dir, src.less + 'auto/']);
}

const build = gulp.series(
	clean,
	gulp.parallel(img, inlineSvg, sprite, scripts, fonts, html),
	grid,
	styles
);

function dev(done){
	production = false;
	done();
}

exports.fonts = fonts;
exports.scripts = scripts;
exports.styles = styles;
exports.clean = clean;
exports.grid = grid;
exports.build = build;
exports.default = gulp.series(dev, build, watch);