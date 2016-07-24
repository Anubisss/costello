var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var processhtml = require('gulp-processhtml')
var envify = require('gulp-envify');
var browserify = require('browserify');
var watchify = require('watchify');

var APP_ENTRY_FILE = 'app.js';
var APP_INDEX_FILE = 'index.html';

var APP_SRC_PATH = 'src';
var APP_SRC_STYLE_PATH = APP_SRC_PATH + '/style';

var APP_DST_PATH = 'build';
var APP_JS_DST_PATH = APP_DST_PATH + '/js';
var APP_CSS_DST_PATH = APP_DST_PATH + '/css';

function handleBundleError() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

gulp.task('watch', function() {
  var bundler = watchify(
    browserify({
      entries: APP_SRC_PATH + '/' + APP_ENTRY_FILE
    })
  );

  var reBundle = function() {
    gutil.log('bundling...');

    return bundler
      .transform('babelify', { presets: [ 'react' ] })
      .bundle()
      .on('error', handleBundleError)
      .pipe(source(APP_ENTRY_FILE))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest(APP_SRC_PATH));
  };

  bundler.on('update', reBundle);

  return reBundle();
});

gulp.task('build', [ 'bundle-js', 'uglify-js', 'clean-js', 'minify-css', 'build-html', 'copy-jquery', 'copy-materialize' ]);

gulp.task('bundle-js', function() {
  return browserify({
    entries: APP_SRC_PATH + '/' + APP_ENTRY_FILE
  })
    .transform('babelify', { presets: [ 'react' ] })
    .bundle()
    .pipe(source(APP_ENTRY_FILE))
    .pipe(gulp.dest(APP_JS_DST_PATH));
});

gulp.task('uglify-js', [ 'bundle-js' ], function() {
  return gulp.src(APP_JS_DST_PATH + '/' + APP_ENTRY_FILE)
    .pipe(envify({ NODE_ENV: 'production' }))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename = path.basename + '.min'
    }))
    .pipe(gulp.dest(APP_JS_DST_PATH));
});

gulp.task('clean-js', [ 'uglify-js' ],  function() {
  return gulp.src(APP_JS_DST_PATH + '/' + APP_ENTRY_FILE, { read: false })
    .pipe(clean());
});

gulp.task('minify-css', function() {
  return gulp.src(APP_SRC_STYLE_PATH + '/*.css')
    .pipe(cleanCSS())
    .pipe(rename(function(path) {
      path.basename = path.basename + '.min'
    }))
    .pipe(gulp.dest(APP_CSS_DST_PATH));
});

gulp.task('build-html', function() {
  return gulp.src(APP_SRC_PATH + '/' + APP_INDEX_FILE)
    .pipe(processhtml())
    .pipe(gulp.dest(APP_DST_PATH));
});

gulp.task('copy-jquery', function() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(APP_JS_DST_PATH));
});

gulp.task('copy-materialize', function() {
  return gulp.src([
    'node_modules/materialize-css/dist/css/materialize.min.css',
    'node_modules/materialize-css/dist/js/materialize.min.js',
    'node_modules/materialize-css/dist/fonts/**'
  ], { base: 'node_modules/materialize-css/dist' })
    .pipe(gulp.dest(APP_DST_PATH));
});

gulp.task('default', [ 'watch' ]);
