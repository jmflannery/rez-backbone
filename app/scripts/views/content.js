define([
  'jquery',
  'underscore',
  'backbone',
  'views/session',
  'views/show/resume',
  'views/new_resume',
  'views/index/resumes',
  'views/edit_resume',
  'models/resume',
  'collections/resume'
], function ($, _, Backbone, SessionView, ShowResumeView, NewResumeView, ResumesView, EditResumeView, Resume, ResumeCollection) {
  'use strict';

  var ContentView = Backbone.View.extend({

    id: 'content',

    initialize: function(vent) {
      this.vent = vent;
      this.listenTo(this.vent, 'show:signin', this.showSignin);
      this.listenTo(this.vent, 'show:home', this.showHome);
      this.listenTo(this.vent, 'show:active_resume', this.showActiveResume);
      this.listenTo(this.vent, 'show:resume', this.showResume);
      this.listenTo(this.vent, 'show:new_resume', this.showNewResume);
      this.listenTo(this.vent, 'show:resumes', this.showResumes);
      this.listenTo(this.vent, 'show:edit_resume', this.showEditResume);
      this.listenTo(this.vent, 'show:edit_resume_item', this.showEditResume);

      this.resumes = new ResumeCollection();
      this.listenToOnce(this.resumes, 'sync', this.contentLoaded);
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
      this.vent.trigger('content:loaded');
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
      this.renderResume(resume);
    },

    showResume: function(resumeId) {
      Backbone.history.navigate("resumes/" + resumeId);
      var resume = this.resumes.get(resumeId);
      this.renderResume(resume);
    },

    renderResume: function(resume) {
      this.resumeView = new ShowResumeView({ model: resume, auth: this.auth });
      this.listenToOnce(this.resumeView, 'show:new_resume', this.showNewResume);
      this.listenToOnce(this.resumeView, 'show:resumes', this.showResumes);
      this.listenToOnce(this.resumeView, 'show:edit_resume', this.showEditResume);
      this.$el.html(this.resumeView.render().el);
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

    showEditResume: function(resumeId, itemId) {
      this.itemId = itemId;
      var resume = this.resumes.get(resumeId);

      if (this.itemId) {
        var item = resume.get('items').get(this.itemId);
        Backbone.history.navigate("resumes/" + resume.id + "/items/" + this.itemId + "/edit");
      } else {
        Backbone.history.navigate("resumes/" + resume.id + "/edit");
      }

      this.editResumeView = new EditResumeView({
        model: resume,
        auth: this.auth,
        vent: this.vent,
        item: item
      });

      this.listenToOnce(this.editResumeView, 'show:resume', this.showResume);
      this.listenToOnce(this.editResumeView, 'resume:edit:ready', this.renderEditResume);
    },

    renderEditResume: function() {
      this.$el.html(this.editResumeView.render().el);
    }
  });

  return ContentView;
});
