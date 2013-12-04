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
    'jquery.cookie': '../bower_components/jquery-cookie/jquery.cookie'
  }
});

require([
  'backbone',
  'routes/app',
  'views/app'
], function (Backbone, AppRouter, AppView) {
  var vent = _.extend({}, Backbone.Events);
  var appRouter = new AppRouter(vent);
  Backbone.history.start({ pushState: true });
});
