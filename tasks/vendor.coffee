gulp = require 'gulp'
gutil = require 'gulp-util'
concat = require 'gulp-concat'

bowerComponentsPath = "#{__dirname}/../bower_components"

gulp.task 'vendor', (done) ->
  gulp.src [
    "#{bowerComponentsPath}/angular/angular.min.js"
    "#{bowerComponentsPath}/angular-resource/angular-resource.min.js"
    "#{bowerComponentsPath}/angular-animate/angular-animate.min.js"
    "#{bowerComponentsPath}/angular-sanitize/angular-sanitize.min.js"
    "#{bowerComponentsPath}/angular-aria/angular-aria.min.js"
    "#{bowerComponentsPath}/angular-material/angular-material.min.js"
    "#{bowerComponentsPath}/angular-ui-router/release/angular-ui-router.min.js"
    "#{bowerComponentsPath}/angular-local-storage/dist/angular-local-storage.min.js"
    "#{bowerComponentsPath}/angular-touch/angular-touch.min.js"
  ]
  .pipe(concat('vendor.js'))
  .on 'error', gutil.log
  .pipe gulp.dest("#{__dirname}/../public/js")
  .on 'end', done
  return
