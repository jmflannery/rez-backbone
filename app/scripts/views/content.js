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
      this.listenTo(this.vent, 'show:resume:edit', this.showEditResume);
      this.listenTo(this.vent, 'show:resume:item:edit', this.showEditResume);
      this.listenTo(this.vent, 'show:resume:item:bullet:edit', this.showEditResume);

      this.resumes = new ResumeCollection();
      this.listenToOnce(this.resumes, 'sync', this.loaded);
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

    load: function() {
      this.resumes.fetch();
    },

    loaded: function() {
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
      this.listenToOnce(this.resumeView, 'resume:edit:show', this.showEditResume);
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

    showEditResume: function(resumeId, itemId, bulletId) {
      var resume = this.resumes.get(resumeId);

      Backbone.history.navigate(this.editUrl(resumeId, itemId, bulletId));

      this.editResumeView = new EditResumeView({
        model: resume,
        auth: this.auth,
        vent: this.vent,
        itemId: itemId,
        bulletId: bulletId
      });

      this.listenToOnce(this.editResumeView, 'resume:edit:ready', this.renderEditResume);
      this.listenToOnce(this.editResumeView, 'show:resume', this.showResume);
    },

    renderEditResume: function() {
      this.$el.html(this.editResumeView.render().el);
    },

    editUrl: function(resumeId, itemId, bulletId) {
      var url = '';
      if (resumeId && itemId && bulletId) {
        url = '/resumes/' + resumeId + '/items/' + itemId + '/bullets/' + bulletId + '/edit';
      } else if (resumeId && itemId && bulletId) {
        url = '/resumes/' + resumeId + '/items/' + itemId + '/edit';
      } else if (resumeId) {
        url = '/resumes/' + resumeId + '/edit';
      }

      return url;
    }
  });

  return ContentView;
});
