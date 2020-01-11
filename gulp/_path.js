// var argv = require('yargs').argv;

const 
	src = 'src/',
	app = 'app/',
	folder = {
		less: 'less/',
		css: 'css/',
		js: 'js/',
		img: 'img/',
		fonts: 'fonts/'
	},
	files = {
		// html: '**/*.+(html|php)',
		html: '**/*.html',
		less: '**/*.less',
		css: '**/*.css',
		js: '**/*.js',
		img: '**/*.+(png|jpg|JPG|jpeg|JPEG|gif)',
		icons: '_icons/*.+(png|jpg|JPG|jpeg|JPEG|gif)',
		svg: '**/*.svg',
		sprite: '_sprite/*.svg',
		fonts: '**/*.ttf'
	};

	// production: !!argv.production,

module.exports.src = {
	dir: src,
	less: src + folder.less,
	js: src + folder.js,
	img: src + folder.img,
	fonts: src + folder.fonts,
	files: {
		html: src + files.html,
		less: src + folder.less + files.less,
		css: src + folder.less + files.css,
		js: src + folder.js + files.js,
		img: src + folder.img + files.img,
		icons: src + folder.img + files.icons,
		svg: src + folder.img + files.svg,
		sprite: src + folder.img + files.sprite,
		fonts: src + folder.fonts + files.fonts
	}
};

module.exports.app = {
	dir: app,
	css: app + folder.css,
	js: app + folder.js,
	img: app + folder.img,
	files: {
		html: app + files.html,
		css: app + folder.css + files.css
	}
};
