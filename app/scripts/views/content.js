define([
  'jquery',
  'underscore',
  'backbone',
  'views/session',
  'views/resume'
], function ($, _, Backbone, SessionView, ResumeView) {
  'use strict';

  var ContentView = Backbone.View.extend({

    id: 'content',

    initialize: function(vent) {
      this.vent = vent;
      this.vent.on('session:new', this.showSignin, this);
      this.vent.on('show:home', this.showHome.bind(this));
      this.vent.on('show:resume', this.showResume.bind(this));
    },

    render: function() {
      this.$el.html("Jack Flannery.me");
      return this;
    },

    showSignin: function() {
      this.$el.html(new SessionView(this.vent).render().el);
    },

    showHome: function() {
      Backbone.history.navigate("");
      this.render();
    },

    showResume: function() {
      Backbone.history.navigate("resume");
      this.$el.html(new ResumeView(this.vent).render().el);
    }
  });

  return ContentView;
});
