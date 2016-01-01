const fs = require('fs')
const gulp = require('gulp')
const nodemon = require('nodemon')
const path = require('path')
const webpack = require('webpack')

const backendConfig = require('./webpack/webpack.config.server')
const frontendConfig = require('./webpack/webpack.config')

function onBuild (done) {
  return (err, stats) => {
    if (err) {
      console.log('Error', err)
    }

    if (done) {
      done()
    }
  }
}

gulp.task('frontend-build', (done) => {
  webpack(frontendConfig).run(onBuild(done))
})

gulp.task('frontend-watch', () => {
  webpack(frontendConfig).watch(100, onBuild())
})

gulp.task('backend-build', (done) => {
  webpack(backendConfig).run(onBuild(done))
})

gulp.task('backend-watch', () => {
  webpack(backendConfig).watch(100, (err, stats) => {
    onBuild()(err, stats)
    nodemon.restart()
  })
})

gulp.task('build', ['frontend-build', 'backend-build'])
gulp.task('watch', ['frontend-watch', 'backend-watch'])

gulp.task('start:dev', ['build', 'watch'], () => {
  nodemon({
    script: path.join(__dirname, 'build/server')
  }).on('restart', () => {
    console.log('Restarted!');
  })
})
