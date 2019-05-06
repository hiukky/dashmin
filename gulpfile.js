/**
 * @author:  H i u k k y
 * @created: 04/05/2019
 */

// Consts
const gulp            = require('gulp'),
      browserSync     = require('browser-sync'),
      sass            = require('gulp-sass');

// Paths
const paths = {
    styles: {
        src: ['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],
        dest: 'src/css'
    },
    scripts: {
        src: ['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'],
        dest: 'src/js'
    },
    html: {
        src: 'src/*.html'
    }
};

// Functions
function styles(){
    return gulp
        .src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());  
};

function scripts(){
    return gulp
        .src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());    
}

function watch(){
    browserSync.init({
        server: './src'
    });

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src).on('change', browserSync.reload);  
}

// Default
const build = gulp.series(scripts, watch);

exports.default = build;