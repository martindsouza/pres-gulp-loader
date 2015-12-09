var
  gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create(),
  // config = require('./config.json'),
  http = require('http'),
  https = require('https')

// TODO mdsouza:
var config = {
  port : 3000,
  notify : true,
  openBrowser : false
}

//Vars
var
  paths = {
    www: 'www/',
    dist: 'dist/',
    slides: 'slides/'
  },
  assets = {
    js: 'js/',
    css: 'css/',
    img: 'img/',
    video: 'video/'
  },
  files = {
    js: '**/*.js',
    css: '**/*.css',
    index: 'index.html',
    all: '**/*.*'
  }
;

// *** TASKS ***
console.log('Loading Tasks');

// Cleans the dist directory
gulp.task('clean-dist', function() {
  return del([paths.dist]);
});



// Slides
gulp.task('slides', function() {
  browserSync.reload();

  return gulp.src([paths.slides + files.all, '!*.*~']) // Ignore temp files created by Atom
    .pipe(gulp.dest(paths.dist + paths.slides));
});


// Index.html
gulp.task('index', function() {
  browserSync.reload();

  return gulp.src(files.index)
    .pipe(gulp.dest(paths.dist));
});

// www
gulp.task('www', function() {
  return gulp.src(paths.www + files.all)
    .pipe(gulp.dest(paths.dist + paths.www))
    // .pipe(plugins.if(config.enableBrowsersync, browserSync.stream({match: files.css})));
    .pipe(browserSync.stream());
});


// Static server
gulp.task('browser-sync', function() {
  // launch browsersync
  browserSync.init({
    port: config.port,
    server: {
      baseDir: ["dist"],
      index: "index.html",
      routes: {
        "/Font-Awesome": "node_modules/font-awesome",
        "/reveal.js" : "reveal.js"
      }
    },
    notify: config.notify,
    open: config.openBrowser
  });
});

// Watch for changes and recompiles
gulp.task('watch', function() {
  gulp.watch(paths.slides + files.all, ['slides']);
  gulp.watch(paths.www + files.all, ['www']);
  gulp.watch(files.index, ['index']);
});

// Default task: builds your app
gulp.task('default', function() {
  // default task order
  var tasks = ['browser-sync', 'index', 'www', 'slides'];

  // run tasks
  runSequence('clean-dist', 'watch', tasks, function() {
    console.log("Successfully built!");
  });
});