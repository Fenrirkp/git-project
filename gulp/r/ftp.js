const gulp  = require('gulp'),
	// gutil = require('gulp-util'),
	gulpSequence = require('gulp-sequence'),
	ftp = require('vinyl-ftp');

const path = require('../gulp/_path');

/** Configuration **/
var user = 'cf34281';
var password = 'Noviepolyani2018';
// var user = process.env.FTP_USER;
// var password = process.env.FTP_PWD;
var host = 'babs.timeweb.ru';
var port = 21;
var localFilesGlob = ['./app/**/*', '!' + './app/img/**/*'];
var remoteFolder = '/xn-----8kcnbcujs2aecoo1b1d1g.xn--p1ai/public_html'

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
	return ftp.create({
		host: host,
		port: port,
		user: user,
		password: password,
		// log: gutil.log,
		parallel: 1
	});
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {
	var conn = getFtpConnection();

	return gulp.src(localFilesGlob, {base: './app', buffer: false})
		.pipe(conn.newer(remoteFolder)) // only upload newer files
		.pipe(conn.dest(remoteFolder));
});

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp`
 */
// gulp.task('ftp', function() {
// 	var conn = getFtpConnection();

// 	gulp.watch(localFilesGlob)
// 	.on('change', function(event) {
// 		console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

// 		return gulp.src([event.path], {base: './app', buffer: false})
// 		.pipe(conn.newer(remoteFolder)) // only upload newer files
// 		.pipe(conn.dest(remoteFolder));
// 	});
// });

gulp.task('ftp-browser', function() {
	return global.browserSync.init({
		// server: {
		// 	baseDir: path.app.dir
		// },
		// proxy: 'школа-приключений.рф',
		proxy: 'http://xn----7sbqlbgbdfexeqo2if6i.xn--p1ai/',
		// injectchanges: true,
		notify: false
	});
});

gulp.task('ftp', function (watcher) {
	gulpSequence(['html', 'svg-sprite', 'inline-svg', 'smartgrid'], 'fonts', 'img', ['less', 'scripts'], 'ftp-deploy', 'ftp-browser')(function watcher(){
		// gulp.watch([path.srcFiles.css, path.srcFiles.less], ['less:watch']);
		gulp.watch(path.srcFiles.less, ['less:watch']);
		gulp.watch(path.srcFiles.html, ['html:watch']);
		gulp.watch(path.srcFiles.js, ['scripts:watch']);
		gulp.watch([path.srcFiles.img, '!' + path.srcFiles.icons], ['img:watch']);
		gulp.watch(path.srcFiles.svg, ['inline-svg', 'svg-sprite:watch']);
		gulp.watch(path.srcFiles.fonts, ['fonts:watch']);

		var conn = getFtpConnection();

		gulp.watch(localFilesGlob)
		.on('change', function(event) {
			console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

			return gulp.src([event.path], {base: './app', buffer: false})
			.pipe(conn.newer(remoteFolder)) // only upload newer files
			.pipe(conn.dest(remoteFolder));
		});
	});
});