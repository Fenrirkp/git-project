const gulp = require('gulp'),
	gulpSequence = require('gulp-sequence');

const path = require('../gulp/_path');

//--------------- Сборка с созданием фавикона (необходимо подключение к интернету) ---------------//

gulp.task('build-f', function() {
	path.production = true;
	gulpSequence('clean', ['favicon-markups', 'img', 'svg-sprite', 'inline-svg', 'fonts', 'scripts'], 'less', 'check-for-favicon-update')();
});

//--------------- Сборка без создания фавикона ---------------//

gulp.task('build', function() {
	path.production = true;
	gulpSequence('clean', ['html', 'img', 'svg-sprite', 'inline-svg', 'fonts', 'scripts'], 'less')();
});