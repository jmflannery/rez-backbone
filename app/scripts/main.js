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
    bootstrap: 'vendor/bootstrap'
  }
});

require([
  'backbone',
  'routes/application',
  'views/app'
], function (Backbone, AppRouter, AppView) {
  var vent = _.extend({}, Backbone.events);
  var appRouter = new AppRouter(vent);
  Backbone.history.start();
});
