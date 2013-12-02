define([
  'jquery',
  'backbone',
  'views/app'
], function ($, Backbone, AppView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(vent) {
      this.vent = vent;
    },

    routes: {
      '': 'app'
    },

    app: function() {
      new AppView(this.vent).render();
    }
  });

  return AppRouter;
});
