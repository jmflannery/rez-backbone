define([
  'jquery',
  'underscore',
  'backbone',
  'views/nav',
  'views/content'
], function ($, _, Backbone, NavView, ContentView) {
  'use strict';

  var AppView = Backbone.View.extend({

    el: '#page',

    initialize: function(vent) {
      this.vent = vent;
      this.vent.on('session:authenticated', this.authenticated)
    },

    render: function() {
      this.$el.html(new NavView(this.vent).render().el);
      this.$el.append(new ContentView(this.vent).render().el);
      return this;
    },

    authenticated: function(user, token) {
      this.user = user;
      this.token = token;
    }
  });

  return AppView;
});
