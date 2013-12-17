define([
  'jquery',
  'backbone',
  'views/app',
  'jquery.cookie'
], function ($, Backbone, AppView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(vent) {
      this.vent = vent;
    },

    routes: {
      '': 'home',
      'signin': 'signin',
      'resume': 'resume'
    },

    home: function() {
      new AppView(this.vent, "home");
    },

    signin: function() {
      new AppView(this.vent);
      this.vent.trigger('session:new');
    },

    resume: function() {
      new AppView(this.vent, "resume");
    }
  });

  return AppRouter;
});
