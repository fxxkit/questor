var gulp            = require('gulp'),
    compass         = require('gulp-compass'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    path            = require('path'),
    nodemon         = require('gulp-nodemon'),
    notify          = require('gulp-notify'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish');

var paths = {
    sass: {
        src: 'src/styles/sass/*.sass',
        dir: 'src/styles/sass',
        dest: 'public/css'
    },
    js: {
        src: 'src/scripts/*.js',
        dest: 'public/scripts'
    },
    images: {
        src: 'src/images/*',
        dest: 'public/images'
    }
};

gulp.task('default', ['styles', 'scripts', 'images'], function () {
    console.log('Hi Here is gulp default');
});

gulp.task('styles', function () {
    return gulp.src(paths.sass.src)
            .pipe(compass({
                css: paths.sass.dest,
                sass: paths.sass.dir
            }))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest(paths.sass.dest));
            // uncomment the following lines if minified css is need
            // and make sure have gulp-minify-css installed
            // .pipe(rename({ suffix: '.min' }))
            // .pipe(minifycss())
            // .pipe(gulp.dest(path.js.dest));
});

gulp.task('images', function () {
    return gulp.src(paths.images.src)
            .pipe(gulp.dest(paths.images.dest));
});

gulp.task('scripts', function () {
    return gulp.src(paths.js.src)
            .pipe(concat('main.js'))
            .pipe(gulp.dest(paths.js.dest))
            // uncomment the following lines if minified js is needed
            // and make sure have gulp-uglify installed 
            // .pipe(rename({ suffix: '.min' }))
            // .pipe(uglify())
            // .pipe(gulp.dest(paths.js.dest));
});

gulp.task('lint', function() {
    return gulp.src(paths.js.src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'gulp lint',
            message: 'Passed. Let it fly!'
        }));
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'app.js',
        ignore: [
            './public/components/**', // bower components
            './node_modules/**',
        ]
    }).on('restart', function () {
        console.log('nodemon restarted');
    });
});

gulp.task('serve', ['default', 'nodemon'], function() {

    // listen on 7000, which is a proxy of express server running on 3000
    browserSync({
        proxy: "http://localhost:3000",
        port: 7000,
    });
    
    // watch .sass files
    gulp.watch(paths.sass.src, ['styles']);

    // watch .js files
    gulp.watch(paths.js.src, ['scripts']);

    // reload when a template file, the compiled css, or the js file changes
    gulp.watch([
        'views/**/*.tpl', 
        path.join(paths.sass.dest, '*.css'),
        path.join(paths.js.dest, '*.js')])
    .on('change', reload);
});

