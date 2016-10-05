'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function (options) {

    gulp.task('html', ['inject'], function () {
        var htmlFilter = $.filter('*.html', { restore: true });
        var jsFilter = $.filter('**/*.js', { restore: true });
        var cssFilter = $.filter('**/*.css', { restore: true });

        return gulp.src(path.join(options.dist, '/*.html'))
            .pipe($.useref())

            .pipe(jsFilter)
            .pipe($.ngAnnotate())
            .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
            .pipe($.rev())
            .pipe(jsFilter.restore)

            .pipe(cssFilter)
            .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
            .pipe($.cssnano())
            .pipe($.rev())
            .pipe(cssFilter.restore)
            .pipe($.revReplace())

            .pipe(htmlFilter)
            .pipe($.htmlmin({
                removeEmptyAttributes: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }))
            .pipe(htmlFilter.restore)
            .pipe(gulp.dest(path.join(options.dist, '/')))
            .pipe($.size({ title: path.join(options.dist, '/'), showFiles: true }));
    });

    gulp.task('fonts', function () {
        return gulp.src($.mainBowerFiles())
            .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
            .pipe($.flatten())
            .pipe(gulp.dest(options.dist + '/fonts/'));
    });

    gulp.task('clean', function (done) {
        $.del([options.dist], done);
    });

    gulp.task('build', ['html', 'fonts']);
};
