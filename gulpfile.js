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
  return createUser();
});

// this not only starts the app but will also monitor for file changes and
// restart the app when changes are detected
gulp.task('nodemon', function() {
  return nodemon({
    script: 'server.js',
    ignore: ['public', 'node_modules']
  }).on('restart');
});

// one-off browserify task which is handy when debugging
// node --harmony `which gulp` browserify
gulp.task('browserify', function() {
  const b = getBrowserifyInstance();
  b.transform(babelify);
  return bundleBrowserify(b);
});

// update bundle.js when changes detected in client-side js/jsx
gulp.task('watchify', function() {
  // create watchify instance wrapping our browserify instance
  // re-run compile whenever watchify emits an update event
  const b = getBrowserifyInstance();
  const w = watchify(b);

  w.transform(babelify);
  w.on('update', function(event) {
    console.log('update detected', event);
    bundleBrowserify(w);
  });
  bundleBrowserify(w);
});

const getBrowserifyInstance = function() {
  // create browserify instance
  const b = browserify('react/main.jsx', {
    debug: true,
    extensions: ['.jsx'],

    // watchify args
    cache: {},
    packageCache: {}
  });

  return b;
}

// clean up user table and recreate admin
const createUser = function(){
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
}

// receives a browserify instance and bundles it
const bundleBrowserify = function(b) {
  return b
    .bundle(function(err){
      if(err){
        console.log(err.message);
      }else{
        console.log('bundle done');
      }
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('public'));
};

// running gulp (or in our ES6 case, node --harmony `which gulp`) will run the
// task in this array
gulp.task('default', ['nodemon', 'watchify', 'adduser']);