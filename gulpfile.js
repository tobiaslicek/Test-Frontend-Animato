const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/scss/main.scss',
        watch: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    },
    html: {
        src: './*.html'
    }
};

function stylesDev() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function stylesBuild() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(paths.styles.watch, stylesDev);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.html.src).on('change', browserSync.reload);
}

const dev = gulp.series(stylesDev, scripts, serve);
const build = gulp.series(stylesBuild, scripts);

exports.stylesDev = stylesDev;
exports.stylesBuild = stylesBuild;
exports.scripts = scripts;
exports.serve = serve;
exports.dev = dev;
exports.watch = dev;
exports.build = build;
exports.default = dev;  