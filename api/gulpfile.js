/**
 * Module Dependencies
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

// (function(console) { setup api and mongo see how old the extension reload is for gulp-watch
//     'use strict';

//     var gulp = require('gulp');;
//     var watch = require('gulp-watch');
//     var io = require('socket.io');

//     gulp.task('chrome-watch', function () {
//         var WEB_SOCKET_PORT = 8890;

//         io = io.listen(WEB_SOCKET_PORT);

//         watch('**/*.*', function(file) {
//             console.log('change detected', file.relative);
//             io.emit('file.change', {});
//         });
//     });

// })(global.console);
/**
 * Config
 */

var paths = {
  styles: [
    './client/css/*.css',
  ],
  scripts: [
    './client/js/*.js',
  ],
  server: [
    './server/bin/www'
  ]
};

var nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_modules']
};


/**
 * Gulp Tasks
 */

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browser-sync', ['nodemon'], function(done) {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  }, done);
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
});

gulp.task('default', ['browser-sync', 'watch'], function(){});
