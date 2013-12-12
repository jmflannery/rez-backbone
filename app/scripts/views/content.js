define([
  'jquery',
  'underscore',
  'backbone',
  'views/session'
], function ($, _, Backbone, SessionView) {
  'use strict';

  var ContentView = Backbone.View.extend({

    id: 'content',

    initialize: function(vent) {
      this.vent = vent;
      this.vent.on('session:new', this.showSignin, this);
    },

    render: function() {
      this.$el.html("Jack Flannery.me");
      return this;
    },

    showSignin: function() {
      this.$el.html(new SessionView(this.vent).render().el);
    },

    showHome: function() {
      this.render();
    }
  });

  return ContentView;
});
