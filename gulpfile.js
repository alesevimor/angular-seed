var gulp = require('gulp');
var ts = require('gulp-typescript');
var webserver = require('gulp-webserver');
var runSequence = require('run-sequence');
var build = require('gulp-build');

// Compile TypeScript

gulp.task('typescript', function() {
    return gulp.src('src/app/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'app.js'
        }))
        .pipe(gulp.dest('build/js'));
});

// Web Server

gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            port: 8000,
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

// Generate build

var options = {};

gulp.task('buildIndex', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('build'))
});

gulp.task('buildTpls', function() {
    gulp.src([
            './src/app/components/**/assets/*.html',
            './src/app/views/*.html',
        ])
        .pipe(gulp.dest('build/html'))
});

gulp.task('buildAssets', function() {
    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('build/assets'));
});

gulp.task('buildDependencies', function() {
    gulp.src([
            '!src/web-dependencies/**/demo/',
            'src/web-dependencies/**/*.+(js|css)',
            '!src/web-dependencies/**/*.min.+(js|css)',
            '!src/web-dependencies/**/index.js',
            '!src/web-dependencies/**/main.js'
        ])
        .pipe(gulp.dest('build/vendor'));
});

gulp.task('buildCss', function() {
    gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('build/css'));
});

gulp.task('build', function(callback) {
    runSequence('buildIndex', 'buildTpls', 'buildDependencies', 'buildCss', 'typescript', 'buildAssets', callback);
});

// Watcher compile/build

gulp.task('watch', ['buildCss', 'buildTpls', 'typescript'], function() {
    gulp.watch('src/**/*.css', ['buildCss']);
    gulp.watch('src/app/**/*.html', ['buildTpls']);
    gulp.watch('src/app/**/*.ts', ['typescript']);
    gulp.watch('src/index.html', ['buildIndex']);
});

// Run project

gulp.task('init', function(callback) {
    runSequence('build', 'webserver', 'watch', callback);
});