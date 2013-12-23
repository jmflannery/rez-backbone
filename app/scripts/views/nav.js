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

    showHome: function(e) {
      e.preventDefault();
      this.vent.trigger('show:home');
    },

    showResume: function(e) {
      e.preventDefault();
      this.vent.trigger('show:resume');
    },

    signout: function(e) {
      e.preventDefault();
      this.vent.trigger('session:destroy');
    },

    userAuthenticated: function(username) {
      this.username = username;
      this.render();
    },

    userSignedOut: function() {
      delete this.username;
      this.render();
    }
  });

  return NavView;
});
