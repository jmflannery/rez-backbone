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
      '': 'app',
      'signin': 'signin',
      'resume': 'resume'
    },

    app: function() {
      new AppView(this.vent).render();
    },

    signin: function() {
      new AppView(this.vent).render();
      this.vent.trigger('session:new');
    },

    resume: function() {
      console.log('resume route');
      new AppView(this.vent).render();
      this.vent.trigger('show:resume');
    }
  });

  return AppRouter;
});
