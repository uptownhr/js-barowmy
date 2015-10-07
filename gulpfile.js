'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const mongoose = require('mongoose');
const config = require('./config');
const User = require("./models/User");


gulp.task('adduser', function(){
  mongoose.connect(config.mongodb);
  return User.findOneAndUpdate( {username: 'admin'},
    {
      username: "admin",
      password: "asdfasdf"
    },{
      upsert: true,
      new: true
    }, function(err,user){
      console.log('user admin created', user)
    }
  )
});

// this not only starts the app but will also monitor for file changes and
// restart the app when changes are detected
gulp.task('nodemon', function() {
  return nodemon({
    script: 'server.js',
    ignore: ['public', 'node_modules']
  }).on('restart');
});

gulp.task('watch', function(){
  var files = [
    'react/admin/main.jsx',
    'react/front/main.jsx'
  ]

})


// update admin.js when changes detected in client-side js/jsx
gulp.task('watch-admin', function() {
  const b = getBrowserifyInstance('react/admin/main.jsx');
  const w = watchify(b);

  w.transform(babelify);
  w.on('update', function(event) {
    console.log('update detected', event);
    bundleBrowserify(w, {name: 'admin.js', path: 'public'});
  });
  bundleBrowserify(w, {name: 'admin.js', path: 'public'});
});

// update front.js when changes detected in client-side js/jsx
gulp.task('watch-front', function() {
  const b = getBrowserifyInstance('react/front/main.jsx');
  const w = watchify(b);

  w.transform(babelify);
  w.on('update', function(event) {
    console.log('update detected', event);
    bundleBrowserify(w, {name: 'front.js', path: 'public'});
  });

  bundleBrowserify(w, {name: 'front.js', path: 'public'})
});


// returns browserify instance of file
const getBrowserifyInstance = function(watch_file) {
  // create browserify instance
  const b = browserify(watch_file, {
    debug: true,
    extensions: ['.jsx'],

    // watchify args
    cache: {},
    packageCache: {}
  });
  return b;
}

// receives a browserify instance and bundles it to target
const bundleBrowserify = function(b, target) {
  return b
    .bundle(function(err){
      if(err){
        console.log(err.message);
      }else{
        console.log('bundle done', target);
      }
    })
    .pipe(source(target.name))
    .pipe(gulp.dest(target.path));
};

gulp.task('default', ['nodemon', 'watch-admin', 'watch-front']);