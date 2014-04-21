// Generated on 2014-04-20 using generator-jekyllized 0.4.1
'use strict';

// Directories used:
//    css:          assets/stylesheets
//    sass:         assets/_scss
//    javascript:   assets/javascript
//    images:       assets/images
//    fonts:        assets/fonts

var gulp = require('gulp');
// Since these gulp plugins contains hyphens they can't be properly
// configured with gulp-load-plugins
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');
// Used for Bower files (jQuery, Normalize etc)
var wiredep = require('wiredep').streams;

// Loads the plugins without having to list all of them, but you need 
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();

// Used for running a LiveReload Server and automatically opening your browser
gulp.task('connect', $.connect.server({
  // Declare what directory and port it runs from
  root: ['serve'],
  port: 4000,
  livereload: true,
  // Automatically opens Firefox when executed
  open: {
    browser: 'Firefox' // if not OS X this should be 'firefox'
  }
}));

// Cleans out the './serve' directory used for serving the site locally
gulp.task('clean-serve', function() {
    return gulp.src('./serve/**/*', { read: false })
      .pipe($.rimraf());
});

// Cleans out the './site' directory used when generating the site
gulp.task('clean-dist', function() {
    return gulp.src('./site/**/*', { read: false })
      .pipe($.rimraf());
});

// Runs the build command for Jekyll to compile the site locally
gulp.task('jekyll-serve', function() {
  return gulp.src('')
    .pipe($.exec("jekyll build"));
});

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don't end up publishing your drafts or future posts
gulp.task('jekyll-build', function() {
  return gulp.src('')
    .pipe($.exec("jekyll build --config _config.yml,_config.build.yml"));
});

// Runs every time a HTML file is changed in the './src' directory
// Also runs the 'jekyll' gulp task
gulp.task('html', ['jekyll-serve'], function () {
  return gulp.src('./src/**/*.html')
    .pipe($.connect.reload());
});

// Runs every time a Markdown file with the .md extention is changed in the './src' directory
// Also runs the 'jekyll' gulp task
gulp.task('markdown',['jekyll-serve'], function() {
  return gulp.src('./src/**/*.md')
    .pipe($.connect.reload());
});

// Compiles the SASS files and moved them into the 'assets/stylesheets' directory
gulp.task('sass', function() {
  // Only runs on the 'assets/_scss/main.scss' file so you need to import all the SCSS files in it
  return gulp.src('./src/assets/_scss/main.scss')
    // Only runs if the file is actually changed, otherwise it will skip it
    .pipe($.changed('./src/assets/stylesheets/**/*'))
    // Prevents it from creating a cache directory and disables warnings
  	.pipe($.rubySass({
      noCache: true,
      quiet: true
    }))
  	.pipe(gulp.dest('./src/assets/stylesheets'));
});

// LiveReload for the CSS
gulp.task('stylesheets', function() {
	return gulp.src('./src/assets/stylesheets/main.css')
    .pipe($.changed('./serve/assets/stylesheets/**/*'))
  	.pipe(gulp.dest('./serve/assets/stylesheets'))
    // Shows the file size in the terminal output
    .pipe($.size())
    // Connects the changes to the LoveReload server and reloads them when they change
    .pipe($.connect.reload());
});

// LiveReload for JS
gulp.task('scripts', function() {
  return gulp.src('./src/assets/javascript/**/*.js')
    .pipe($.changed('./serve/assets/javascript/**/*'))
    .pipe(gulp.dest('./serve/assets/javascript'))
    .pipe($.size())
    .pipe($.connect.reload());
});

// LiveReload for images
gulp.task('images', function() {
  // Only works on PNG, JPEG and GIFs currently
  return gulp.src(['./src/assets/images/**/*.jpg', './src/assets/images/**/*.png', './src/assets/images/**/*.gif', './src/assets/images/**/*.svg'])
    .pipe($.changed('./serve/assets/images/**/*'))
    .pipe(gulp.dest('./serve/assets/images'))
    .pipe($.size())
    .pipe($.connect.reload());
});

// Minifies the HTML of the site
gulp.task('htmlify', function() {
  return gulp.src('./serve/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./site'));
});

// Move the '.txt' and '.xml' files from './serve' to './site'
gulp.task('move', function() {
  return gulp.src(['./serve/**/*.xml', './serve/**/*.txt'])
    .pipe(gulp.dest('./site'))
});

// Optimize the CSS with Autoprefixer and CSS Optimizer
gulp.task('cssoptimize', function() {
  return gulp.src('./serve/assets/stylesheets/main.css')
    // Autoprefixes your CSS for the last version of the browers
    .pipe($.autoprefixer('last 1 version'))
    // Optimizes it via CSS Optimizer
    .pipe($.csso())
    .pipe(gulp.dest('./site/assets/stylesheets'))
    .pipe($.size());
});

// Optimize images using image-min and only update changed files
gulp.task('imgoptimize', function() {
  return gulp.src(['./src/assets/images/**/*.jpg', './src/assets/images/**/*.png', './src/assets/images/**/*.gif'])
    .pipe($.changed('./site/assets/images/**/*'))
    .pipe($.imagemin({
      // Runs 16 trials on the PNGs to better the optimization
      // Can by anything from 1 to 7, for more see https://github.com/gruntjs/grunt-contrib-imagemin#optimizationlevel-png-only
      optimizationLevel: 3,
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true,
      // Enables pngquant lossy compression
      pngquant: true
    }))
    .pipe(gulp.dest('./site/assets/images'))
    .pipe($.size());
});

// Optimize the JavaScript
gulp.task('jsoptimize', function() {
  return gulp.src('./serve/assets/javascript/**/*.js')
    // Concats the JS files into one file, see '_layouts_default.html'
    .pipe($.useref())
    // Concats the files into one minimized one
    .pipe($.concat('all.min.js'))
    // Minifies the JS via Uglify
    .pipe($.uglify())
    .pipe(gulp.dest('site/assets/javascript'))
    .pipe($.size());
});

// Run CSS Lint against your CSS
gulp.task('csslint', function() {
  gulp.src('./serve/assets/stylesheets/main.css')
  	// Check your CSS quality against your .csslintrc file
    .pipe($.csslint('.csslintrc'))
    .pipe($.csslint.reporter())
});

// Run JS Lint against your JS
gulp.task('jslint', function() {
  gulp.src('./serve/assets/javascript/*.js')
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter());
});

// Runs 'jekyll doctor' on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task('doctor', function() {
  return gulp.src('')
    .pipe($.exec("jekyll doctor"));
});

// Watch your files for changes and reload them automatically
gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/_posts/**/*.md', ['markdown']);
  gulp.watch('./src/assets/images/**/*', ['jekyll-serve', 'images']);
  gulp.watch('./src/assets/_scss/**/*.scss', ['sass']);
  gulp.watch('./src/assets/stylesheets/**/*.css', ['stylesheets']);
  gulp.watch('./src/assets/javascript/**/*.js', ['scripts']);
});

// Default task, run when just writing 'gulp' in the terminal
gulp.task('default', ['clean-serve', 'jekyll-serve', 'sass', 
                      'stylesheets', 'scripts', 'images'], function() {
  gulp.start('connect', 'watch');
});

// Checks your CSS, JS and Jekyll for errors
gulp.task('check', ['csslint', 'jslint', 'doctor'], function() {
  // Better hope nothing is wrong.
});

// Builds the site but doesn't serve it to you
gulp.task('build', ['clean-serve', 'jekyll-build',
                    'sass', 'stylesheets', 
                    'images', 'scripts'], function() {
});

// Builds your site with the 'build' command and then runs all the optimizations on
// it and outputs it to './site'
gulp.task('publish', ['build', 'clean-dist'], function() {
  gulp.start('htmlify', 'cssoptimize', 'move',
              'imgoptimize', 'jsoptimize');
});