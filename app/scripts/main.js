/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: 'vendor/bootstrap',
    'jquery.cookie': '../bower_components/jquery-cookie/jquery.cookie',
    core_ext: 'lib/core_ext'
  }
});

require([
  'backbone',
  'core_ext',
  'routes/app',
  'lib/Authenticate'
], function (Backbone, CoreExt, AppRouter, Auth) {
  var vent = _.extend({}, Backbone.Events);
  CoreExt.include();

  Auth.authenticate({
    success: function(user) {
      new AppRouter(vent, user);
      Backbone.history.start();
    },
    fail: function() {
      new AppRouter(vent);
      Backbone.history.start();
    }
  });
});
