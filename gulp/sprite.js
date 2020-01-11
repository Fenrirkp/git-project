const
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	svgSprite = require('gulp-svg-sprite'),
	svgSpriteConfig = {
		shape : {
			dimension : {
				maxWidth : 100,
				maxHeight : 100
			}
			// spacing : {
			// 	padding : 10
			// }
		},
		mode : {
			// view : {				// Activate the «view» mode 
			// 	dest : 'less/',
			// 	dimensions : true,
			// 	sprite : '../img/sprite.svg',
			// 	bust : false,		// Добавляет случайный идентификатор для сброса кеширования
			// 	render : {
			// 		less: {
			// 			dest: '_sprite.less'
			// 		}
			// 	}
			// },
			symbol: {
				dest : './',
				sprite: app.img + 'sprite.svg',
				render : {
					less: {
						dest: src.less + 'auto/_sprite.less',
						template: 'templates/_sprite_template.less'
					}
				}
			}
		}
	};

module.exports = function sprite() {
	return gulp.src(src.files.sprite, {cwd: ''}) // cwd ?
	.pipe(svgmin())
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
		},
		parserOptions: {xmlMode: true}
	}))
	.pipe(replace('&gt;', '>'))
	.pipe(svgSprite(svgSpriteConfig))
	.pipe(gulp.dest('./'))
	.pipe(browserSync.stream());
};

// gulp.task('svg-sprite:watch', ['svg-sprite'], function() {
// 	return global.browserSync.reload('*.html');
// });
