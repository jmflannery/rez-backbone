define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NavView = Backbone.View.extend({
    template: JST['app/scripts/templates/nav.ejs'],

    tagName: 'nav',

    initialize: function(vent) {
      this.vent = vent;
    },

    events: {
      'click .home': 'showHome',
      'click .resume': 'showResume',
      'click .signout': 'signout'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    showHome: function() {
      this.vent.trigger('show:home');
    },

    showResume: function() {
      this.vent.trigger('show:resume');
    },

    userAuthenticated: function(username) {
      this.username = username;
      this.render();
    },

    userSignedOut: function() {
      delete this.username;
      this.render();
    },

    signout: function() {
      this.vent.trigger('session:destroy');
    }
  });

  return NavView;
});
