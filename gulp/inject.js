'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('underscore');
var path = require('path');
var wiredep = require('wiredep').stream;

module.exports = function (options) {

    gulp.task('partials', function () {
        return gulp.src([
            path.join(options.src, '/app/**/*.html')])
            .pipe($.htmlmin({
                removeEmptyAttributes: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }))
            .pipe($.angularTemplatecache('templateCacheHtml.js', {
                module: 'shared',
                root: 'app'
            }))
            .pipe(gulp.dest(options.src + '/app/partials'))
            .pipe(gulp.dest(options.dist + '/partials'));
    });

    gulp.task('inject', ['partials'], function () {

        var injectStyles = gulp.src([
            options.src + '/app/**/*.css'
        ], {read: false});

        var injectScripts = gulp.src([options.src + '/app/**/*.js', '!' + options.src + '/app/partials/*.js'])
            .pipe($.angularFilesort())
            .on('error', options.errorHandler('AngularFilesort'));

        var injectOptions = {
            ignorePath: [options.src],
            addRootSlash: false
        };

        var partialsInjectFile = gulp.src(path.join(options.src, '/app/partials/templateCacheHtml.js'), {read: false});
        var partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            ignorePath: path.join(options.src, '/'),
            addRootSlash: false
        };

        return gulp.src(options.src + '/*.html')
            .pipe($.inject(injectStyles, injectOptions))
            .pipe($.inject(injectScripts, injectOptions))
            .pipe($.inject(partialsInjectFile, partialsInjectOptions))
            .pipe(wiredep(options.wiredep))
            .pipe(gulp.dest(options.dist));
    });
};
