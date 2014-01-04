define([
  'jquery',
  'underscore',
  'backbone',
  'views/session',
  'views/detail_resume',
  'views/new_resume',
  'views/resumes',
  'views/edit_resume',
  'models/resume',
  'collections/resume'
], function ($, _, Backbone, SessionView, DetailResumeView, NewResumeView, ResumesView, EditResumeView, Resume, ResumeCollection) {
  'use strict';

  var ContentView = Backbone.View.extend({

    id: 'content',

    initialize: function(vent) {
      this.vent = vent;
      this.vent.on('show:signin', this.showSignin, this);
      this.vent.on('show:home', this.showHome.bind(this));
      this.vent.on('show:active_resume', this.showActiveResume.bind(this));
      this.vent.on('show:resume', this.showResume.bind(this));
      this.vent.on('show:new_resume', this.showNewResume.bind(this));
      this.vent.on('show:resumes', this.showResumes.bind(this));
      this.vent.on('show:edit_resume', this.showEditResume.bind(this));

      this.resumes = new ResumeCollection();
      this.listenTo(this.resumes, 'sync', this.contentLoaded);
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

    loadContent: function() {
      this.resumes.fetch();
    },

    contentLoaded: function() {
      this.trigger('content:loaded');
    },

    showSignin: function() {
      this.$el.html(new SessionView(this.vent).render().el);
    },

    showHome: function() {
      Backbone.history.navigate("");
      this.$el.html("Jack Flannery.me");
    },

    showActiveResume: function() {
      Backbone.history.navigate("resume");
      var resume = this.resumes.get(1);
      this.listenTo(resume, 'resume:loaded', this.renderResume);
      resume.fetchAssociatedObjects();
    },

    showResume: function(resumeId) {
      console.log('resume showing: ' + resumeId);
      Backbone.history.navigate("resumes/" + resumeId);
      var resume = this.resumes.get(resumeId);
      this.listenToOnce(resume, 'resume:loaded', this.renderResume);
      resume.fetchAssociatedObjects();
    },

    renderResume: function(resume) {
      console.log('rendering resume:');
      console.log(resume);
      var resumeView = new DetailResumeView({ model: resume, auth: this.auth });
      this.listenToOnce(resumeView, 'show:new_resume', this.showNewResume);
      this.listenToOnce(resumeView, 'show:resumes', this.showResumes);
      this.listenToOnce(resumeView, 'show:edit_resume', this.showEditResume);
      this.$el.html(resumeView.render().el);
    },

    showNewResume: function() {
      Backbone.history.navigate("resumes/new");
      var newResumeView = new NewResumeView(this.resumes, this.auth);
      this.listenTo(newResumeView, 'show:resume', this.showResume);
      this.$el.html(newResumeView.render().el);
    },

    showResumes: function() {
      Backbone.history.navigate("resumes");
      this.$el.html(new ResumesView({
        collection: this.resumes,
        auth: this.auth,
        vent: this.vent
      }).render().el);
    },

    showEditResume: function(resumeId) {
      Backbone.history.navigate("resumes/" + resumeId + "/edit");
      var resume = this.resumes.get(resumeId);
      this.listenToOnce(resume, 'resume:loaded', this.loadEditResume);
      resume.fetchAssociatedObjects();
    },

    loadEditResume: function(resume) {
      this.editResumeView = new EditResumeView({ model: resume, auth: this.auth });
      this.listenToOnce(this.editResumeView, 'show:resume', this.showResume);
      this.listenToOnce(this.editResumeView, 'resume:edit:ready', this.renderEditResume);
    },

    renderEditResume: function() {
      this.$el.html(this.editResumeView.render().el);
    }
  });

  return ContentView;
});
