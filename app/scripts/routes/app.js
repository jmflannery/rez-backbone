define([
  'jquery',
  'backbone',
  'views/app',
  'jquery.cookie'
], function ($, Backbone, AppView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(vent) {
      console.log($.cookie('session:token'));
      this.vent = vent;
    },

    routes: {
      '': 'app',
      'signin': 'signin'
    },

    app: function() {
      new AppView(this.vent).render();
    },

    signin: function() {
      new AppView(this.vent).render();
      this.vent.trigger('session:new');
    }
  });

  return AppRouter;
});
