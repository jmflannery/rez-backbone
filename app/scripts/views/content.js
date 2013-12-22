define([
  'jquery',
  'underscore',
  'backbone',
  'views/session',
  'views/detail_resume',
  'views/new_resume',
  'views/resumes',
  'models/resume',
  'collections/resume'
], function ($, _, Backbone, SessionView, DetailResumeView, NewResumeView, ResumesView, Resume, ResumeCollection) {
  'use strict';

  var ContentView = Backbone.View.extend({

    id: 'content',

    initialize: function(vent, currentPage) {
      this.vent = vent;
      this.currentPage = currentPage;
      this.vent.on('show:signin', this.showSignin, this);
      this.vent.on('show:home', this.showHome.bind(this));
      this.vent.on('show:resume', this.showResume.bind(this));
      this.vent.on('show:new_resume', this.showNewResume.bind(this));
      this.vent.on('show:resumes', this.showResumes.bind(this));

      this.resumes = new ResumeCollection();
      this.listenTo(this.resumes, 'reset', this.resumesFetched);
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

    fetchResumes: function() {
      this.resumes.fetch({ reset: true });
    },

    resumesFetched: function() {
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
      var resume = this.resumes.get(1);
      var resumeView = new DetailResumeView({ model: resume, auth: this.auth });
      this.listenTo(resumeView, 'show:new_resume', this.showNewResume);
      this.listenTo(resumeView, 'show:resumes', this.showResumes);
      this.$el.html(resumeView.render().el);
    },

    showNewResume: function() {
      Backbone.history.navigate("new_resume");
      this.$el.html(new NewResumeView(this.resumes).render().el);
    },

    showResumes: function() {
      Backbone.history.navigate("resumes");
      this.$el.html(new ResumesView({ collection: this.resumes }).render().el);
    }
  });

  return ContentView;
});
