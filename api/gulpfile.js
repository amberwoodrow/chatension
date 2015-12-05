// MODULE DEPENDENCIES

var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var io = require('socket.io');

// CONFIG

var paths = {
  sass: [
    '../extension/main.css'
  ],
  server: [
    './server/bin/www'
  ],
  content: [
    '../extension/content.js'
  ]
};

var nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_modules']
};

// GULP TASKS

gulp.task('babel-build', function() {
  // build command line: 
  // babel --presets react ../extension/content.js --watch --out-dir ./build_output
  console.log('Babel built');
  return gulp.src('../extension/content.js')
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest('../extension/build_output'));
});

gulp.task('chrome-watch', function () {
  var WEB_SOCKET_PORT = 8890;
  io = io.listen(WEB_SOCKET_PORT);
  watch('**/*.*', function(file) {
    console.log('chrome-watch change detected in: ', file.relative);
    io.emit('file.change', {});
  });
});

gulp.task('sass-build', function () {

});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon(nodemonConfig)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.content, ['babel-build']);
});

gulp.task('default', ['nodemon', 'watch', 'chrome-watch'], function(){});