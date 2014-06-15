// Karma configuration
// Generated on Thu Jun 12 2014 18:10:49 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'user/bower_components/angular/angular.js',
      'user/bower_components/angular-mocks/angular-mocks.js',
      'user/bower_components/angular-ui-router/release/angular-ui-router.js',
      'user/bower_components/lodash/dist/lodash.js',
      'user/app/app.js',
      'user/app/common/directives/*.dir.js',
      //This one causes an unknown error 'user/app/common/services/*.srv.js',
      'user/app/common/module.js',
      'user/app/pages/module.js',
      'user/app/pages/directives/*.dir.js',
      'user/app/pages/controllers/*.ctrl.js',
      'user/app/pages/services/*.srv.js',
      'admin/app/app.js',
      'admin/app/common/directives/*.dir.js',
      'admin/app/common/module.js',
      'admin/app/pages/module.js',
      'admin/app/pages/directives/*.dir.js',
      'admin/app/pages/controllers/*.ctrl.js',
      'admin/app/pages/services/*.srv.js',
      'admin/app/common/services/*.srv.js',
      'test/test-user.js',
      'test/test-admin-mainctrl.js',
      'test/test-admin-reqctrl.js',
      
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,



    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    plugins: ['karma-jasmine',
              'karma-chrome-launcher'
              ],

   

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
