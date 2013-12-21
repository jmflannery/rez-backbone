define([
  'jquery',
  'underscore',
  'backbone',
  'views/session',
  'views/resume',
  'models/resume',
  'collections/resume'
], function ($, _, Backbone, SessionView, ResumeView, Resume, ResumeCollection) {
  'use strict';

  var ContentView = Backbone.View.extend({

    id: 'content',

    initialize: function(vent, current_page) {
      this.vent = vent;
      this.current_page = current_page;
      this.vent.on('show:signin', this.showSignin, this);
      this.vent.on('show:home', this.showHome.bind(this));
      this.vent.on('show:resume', this.showResume.bind(this));
    },

    render: function() {
      return this;
    },

    setAuth: function(auth) {
      this.auth = auth;
    },

    destroyAuth: function() {
      delete this.auth;
    },

    fetchFirstResume: function() {
      this.resume = new Resume({id: 1});
      this.listenTo(this.resume, 'sync', this.resumeFetched);
      this.resume.fetch();
    },

    resumeFetched: function() {
      this.trigger('content:loaded');
    },

    showSignin: function() {
      this.$el.html(new SessionView(this.vent).render().el);
    },

    showHome: function() {
      Backbone.history.navigate("");
      this.$el.html("Jack Flannery.me");
    },

    showResume: function() {
      Backbone.history.navigate("resume");
      this.$el.html(new ResumeView({ model: this.resume, auth: this.auth }).render().el);
    }
  });

  return ContentView;
});
