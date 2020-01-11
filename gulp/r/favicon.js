const gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	realFavicon = require ('gulp-real-favicon'),
	fs = require('fs');

const path = require('../gulp/_path');

var FAVICON_DATA_FILE = 'faviconData.json';

gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'src/favicon.svg',
		dest: 'app',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '18%',
				assets: {
					ios6AndPriorIcons: true,
					ios7AndLaterIcons: true,
					precomposedIcons: true,
					declareOnlyDefaultIcon: false
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'whiteSilhouette',
				backgroundColor: '#ff7f00',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: true,
					windows10Ie11EdgeTiles: {
						small: true,
						medium: true,
						big: true,
						rectangle: true
					}
				}
			},
			androidChrome: {
				pictureAspect: 'shadow',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: true,
					lowResolutionIcons: true
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#ff7f00'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});

gulp.task('favicon-markups', ['generate-favicon'], function(){
	return gulp.src(path.srcFiles.html)
	.pipe(plumber())
	.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
	.pipe(gulp.dest(path.app.dir));
});