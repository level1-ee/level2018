const fs = require('fs')
const gulp = require('gulp')
const hb = require('gulp-hb')
const watch = require('gulp-watch')
const rename = require('gulp-rename')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const path = require('path')
const slug = require('slug')
const webpackConfig = require('./webpack.config.js')

const server = browserSync.create()

const paths = {
  scripts: {
    watchSrc: 'src/js/**/*.js',
    src: 'src/js/app.js',
    dest: 'dist/assets/js/',
  },
  templates: {
    watchSrc: 'src/templates/**/*.hbs',
    src: 'src/templates/*.hbs',
    dest: 'dist/',
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/assets/styles/',
  },
  static: {
    src: 'src/static/**/*.*',
    dest: 'dist/assets/',
  },
}

function generateHtml() {
  return gulp
    .src(paths.templates.watchSrc)
    .pipe(
      hb()
        .helpers({
          escAttr(string) {
            return slug(string, { lower: true })
          },
        })
        .data('./src/data/**/*.{js,json}')
        .partials('./src/templates/partials/**/*.hbs'),
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.templates.dest))
}

function generateStyles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
}

function generateScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.join(__dirname, paths.scripts.dest)))
}

function copyStatic() {
  return gulp.src(paths.static.src).pipe(gulp.dest(paths.static.dest))
}

function serve(done) {
  server.init({
    files: ['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js'],
    server: {
      baseDir: './dist',
      watchOptions: {
        awaitWriteFinish: true,
      },
    },
  })
  done()
}
gulp.task('browser-sync', serve)

gulp.task('templates', generateHtml)
gulp.task('styles', generateStyles)
gulp.task('scripts', generateScripts)
gulp.task('static', copyStatic)

gulp.task('watch:styles', (done) => {
  gulp.watch(paths.styles.src, gulp.series('styles'))
  done()
})

gulp.task('watch:scripts', (done) => {
  gulp.watch(paths.scripts.watchSrc, gulp.series('scripts'))
  done()
})

gulp.task('watch:html', (done) => {
  gulp.watch(paths.templates.watchSrc, gulp.series('templates'))
  done()
})

gulp.task('watch:static', (done) => {
  gulp.watch(paths.static.src, gulp.series('static'))
  done()
})

gulp.task('watch', gulp.parallel('watch:styles', 'watch:html', 'watch:scripts', 'watch:static'))

gulp.task('build', gulp.parallel('styles', 'scripts', 'templates', 'static'))
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'browser-sync')))
