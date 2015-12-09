var
  gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create(),
  http = require('http'),
  https = require('https')
;

var config = {
  port : 3000,
  notify : true,
  openBrowser : false,
  srcPath : '/Users/giffy/Documents/GitHub/orclapex-yyc/pres-2015dec10-apex-5-migration/'
}

//Vars
var
  paths = {
    www: 'www/',
    dist: 'dist/',
    slides: 'slides/'
  },
  // TODO mdsouza: delete
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

  return gulp.src([config.srcPath + paths.slides + files.all, '!*.*~']) // Ignore temp files created by Atom
    .pipe(gulp.dest(paths.dist + paths.slides));
});


// Index.html
gulp.task('index', function() {
  browserSync.reload();

  return gulp.src(config.srcPath + files.index)
    .pipe(gulp.dest(paths.dist));
});

// www
gulp.task('www', function() {
  return gulp.src(config.srcPath + paths.www + files.all)
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
      baseDir: [paths.dist],
      index: "index.html",
      routes: {
        "/Font-Awesome": config.srcPath + "node_modules/font-awesome",
        "/reveal.js" : config.srcPath + "reveal.js"
      }
    },
    notify: config.notify,
    open: config.openBrowser
  });
});

// Watch for changes and recompiles
gulp.task('watch', function() {
  gulp.watch(config.srcPath + paths.slides + files.all, ['slides']);
  gulp.watch(config.srcPath + paths.www + files.all, ['www']);
  gulp.watch(config.srcPath + files.index, ['index']);
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
