var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect');

gulp.task('help', function(){
    gutil.log('');
    gutil.log('Usage: ' + gutil.colors.magenta('gulp') + ' [<tasks>] [<options>]');

    gutil.log('');
    gutil.log('Tasks:');
    gutil.log('\t build \t\t Builds the app into the dist directory');
    gutil.log('\t connect \t Serves the production app from the dist directory');
    // gutil.log('\t test \t\t Run all tests');
    gutil.log('\t default \t Run a local dev environment');
    gutil.log('\t help \t\t Prints out this command');
});

gulp.task('build', ['html', 'images', 'css', 'js', 'vendor', 'buildIndex']);

gulp.task('html', function () {
    gulp.src('src/partials/**/*.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/partials'));
});

gulp.task('images', function () {
    gulp.src('src/images/**/*')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('css', function () {
    gulp.src('src/css/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    gulp.src(['src/components/base/Class.js',
            'src/components/base/EventDispatcher.js',
            'src/components/base/Events.js',
            'src/components/base/BaseDirective.js',
            'src/components/base/*',
            'src/lang/en/lang.js', //Include our lang strings
            'src/**/*.*js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function () {
    gulp.src(['bower_components/angular/angular.js',
              'bower_components/angular-translate/angular-translate.js',
              'bower_components/angular-ui-router/release/angular-ui-router.js'])
        .pipe(concat('vendor.js'))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

gulp.task('buildIndex', [], function () {
    gulp.src('src/index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});



 
gulp.task('connect', ['build'], function() {
    connect.server({
        root: 'dist',
        port: 1234,
        livereload: true,
        fallback: 'dist/index.html'
    });
});
 
gulp.task('watch', ['build'], function () {
    gulp.watch(['src/partials/**/*.html'], ['html']);
    gulp.watch(['src/css/**/*.scss'], ['css']);
    gulp.watch(['src/images/**/*'], ['images']);
    gulp.watch(['src/**/*.js'], ['js']);
    gulp.watch(['bower_components/**/*.js'], ['vendor']);
    gulp.watch(['src/index.html'], ['buildIndex']);
});
 
gulp.task('default', ['build', 'connect', 'watch']);