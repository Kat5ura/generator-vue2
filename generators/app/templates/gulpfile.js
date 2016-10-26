/**
 * Created by liuqi453 on 10/17/16.
 */
var gulp = require('gulp')
// var plugins = require('gulp-load-plugins')()
// var webpack = require('webpack')
var rimraf = require('rimraf')

var devConfig = require('./build/webpack.dev.conf')
var devServe = require('./build/dev-server').devServe

var prdConfig = require('./build/webpack.prod.conf')
var prdBuild = require('./build/build').prdBuild

gulp.task('clean', function (callback) {
  rimraf('./dist', function () {
    callback()
  })
})


gulp.task('webpack:build', function(callback) {
  prdBuild(prdConfig, callback)
})

// Production build
gulp.task('build', ['webpack:build'])


gulp.task('webpack:serve', function(callback) {
  // Start a webpack-dev-server
  devServe(devConfig)
})

gulp.task('serve', ['webpack:serve'])

// The development server (the recommended option for development)
gulp.task('default', ['serve'])
