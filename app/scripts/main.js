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
  'views/app'
], function (Backbone, CoreExt, AppRouter, AppView) {
  CoreExt.include();
  var vent = _.extend({}, Backbone.Events);
  var appRouter = new AppRouter(vent);
  var appView = new AppView(vent);
  vent.listenToOnce(vent, 'content:loaded', function() {
    Backbone.history.start();
  });
});
