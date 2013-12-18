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

    initialize: function(vent, current_page) {
      this.vent = vent;
      this.current_page = current_page;
      this.vent.on('show:signin', this.show_signin, this);
      this.vent.on('show:home', this.show_home.bind(this));
      this.vent.on('show:resume', this.show_resume.bind(this));
    },

    render: function() {
      this.vent.trigger('show:' + this.current_page);
      return this;
    },

    set_auth: function(auth) {
      this.auth = auth;
    },

    destroy_auth: function() {
      delete this.auth;
    },

    show_signin: function() {
      this.$el.html(new SessionView(this.vent).render().el);
    },

    show_home: function() {
      Backbone.history.navigate("");
      this.$el.html("Jack Flannery.me");
    },

    show_resume: function() {
      Backbone.history.navigate("resume");
      this.$el.html(new ResumeView(this.vent, this.auth).render().el);
    }
  });

  return ContentView;
});
