var gulp    = require('gulp'),
    path    = require('path'),
    bower   = require('gulp-bower'),
    jshint  = require('gulp-jshint'),
    refresh = require('gulp-livereload'),
    notify  = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    client  = require('tiny-lr')(),
    list    = require('gulp-task-listing'),
    nodemon = require('gulp-nodemon'),
    lr_port = 35729,
    less   = require('gulp-less');
    // stripDebug  = require('gulp-strip-debug'),
    // uglify      = require('gulp-uglify'),
    // ngmin       = require('gulp-ngmin'),
    // gulpconcat  = require('gulp-concat'),
   
var paths = {
  scripts: [
            '!client/bower_components',
            '!client/test',
            'client/user/app/**/*.js',
            'client/admin/app/**/*.js'
            ],
  views: [
          'client/user/**/*.html',
          'client/admin/**/*.html'
          ],
  styles: {
    css:  ['client/user/assets/**/*.css', 'client/admin/assets/**/*.css', 'client/**/*.css'],
    less: ['client/user/assets/**/*.less', 'client/admin/assets/**/*.less', 'client/**/*.less'],
    dest: ['client/user/assets/styles', 'client/admin/assets/styles']
  }
};
var build = ['less', 'css', 'lint'];


gulp.task('less', function () {
  gulp.src(paths.styles.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('client/assets/styles'))
    .pipe(refresh(client))
    .pipe(notify({message: 'Less done'}));
});

gulp.task('html', function () {
  return gulp.src(paths.views)
    .pipe(plumber())
    .pipe(refresh(client))
    .pipe(notify({message: 'Views refreshed'}));
});

gulp.task('css', function () {
  return gulp.src(paths.styles.css)
    .pipe(plumber())
    .pipe(refresh(client))
    .pipe(notify({message: 'CSS refreshed'}));
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(refresh(client))
    .pipe(notify({message: 'Lint done'}));
});

gulp.task('serve', function () {
  nodemon({script: 'server/server.js', ignore: ['node_modules/**/*.js']})
    .on('restart', function () {
      refresh(client);
    });
});

gulp.task('live', function () {
  client.listen(lr_port, function (err) {
    if (err) {
      return console.error(err);
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.styles.less, ['less']);
  gulp.watch(paths.views, ['html']);
  gulp.watch(paths.scripts, ['lint']);
});

gulp.task('build', build);

gulp.task('default', ['build', 'live', 'serve', 'watch']);
