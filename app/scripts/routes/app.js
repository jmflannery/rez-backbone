define([
  'backbone',
  'collections/resume',
  'views/resumes/resume',
  'views/session',
  'lib/authenticate',
  'views/resumes/new',
  'views/resumes/list',
], function (Backbone, ResumeCollection, ResumeView, SessionView, Auth, NewResumeView, ResumeListView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(vent, user) {
      this.vent = vent;
      this.user = user;
      this.resumes = new ResumeCollection();
      this.$page = $('#page');
    },

    routes: {
      '': 'activeResume',
      'signin': 'signin',
      'resumes/new': 'newResume',
      'resumes/:id': 'resume',
      'resumes': 'resumes',
      'resumes/:id/edit': 'editResume',
      'resumes/:resume_id/sections/:section_id/edit': 'editResumeSection',
      'resumes/:resume_id/sections/:section_id/items/:item_id/edit': 'editResumeSectionItem',
      'resumes/:resume_id/items/:item_id/bullets/new': 'newResumeItemBullet',
      'resumes/:resume_id/items/:item_id/paragraphs/new': 'newResumeItemParagraph',
      'resumes/:resume_id/items/:item_id/bullets/:bullet_id/edit': 'editResumeItemBullet'
    },

    activeResume: function() {
      this.resumes.fetch().then(function(resumes, response, options) {
        this.resumes.reset(resumes.resumes);
        var resume = this.resumes.get(1);
        this.renderResume(resume);
      }.bind(this));
    },

    signin: function() {
      var sesh = new SessionView(this.user);
      this.listenTo(sesh, 'session:authenticated', function(model, response, options) {
        this.user = Auth.authenticated(model, response, options);
        sesh.remove();
        this.navigate('/');
      });
      this.$page.prepend(sesh.render().el);
    },

    resume: function(resumeId) {
      this.resumes.fetch().then(function(resumes, response, options) {
        var resume = this.resumes.get(resumeId);
        this.renderResume(resume);
      }.bind(this));
    },

    renderResume: function(resume) {
      var resumeView = new ResumeView({ model: resume, user: this.user });
      this.$page.html(resumeView.render().el);
    },

    resumes: function() {
      this.resumes.fetch().then(function(resumes, response, options) {
        this.$page.html(new ResumeListView({
          collection: this.resumes,
          user: this.user,
          vent: this.vent
        }).render().el);
      }.bind(this));
    },

    newResume: function() {
      this.resumes.fetch().then(function(resumes, response, options) {
        var newResumeView = new NewResumeView(this.resumes, this.user);
        this.$page.html(newResumeView.render().el);
      }.bind(this));
    },

    editResume: function(resumeId) {
      this.vent.trigger('show:resume:edit', resumeId);
    },

    editResumeSection: function(resumeId, sectionId) {
      this.vent.trigger('show:resume:section:edit', resumeId, sectionId);
    },

    editResumeSectionItem: function(resumeId, sectionId, itemId) {
      this.vent.trigger('show:resume:section:item:edit', resumeId, sectionId, itemId);
    },

    newResumeItemBullet: function(resumeId, itemId) {
      this.vent.trigger('show:resume:item:bullet:new', resumeId, itemId, 'new', null);
    },

    newResumeItemParagraph: function(resumeId, itemId) {
      this.vent.trigger('show:resume:item:paragraph:new', resumeId, itemId, null, 'new');
    },

    editResumeItemBullet: function(resumeId, itemId, bulletId) {
      this.vent.trigger('show:resume:item:bullet:edit', resumeId, itemId, bulletId);
    }
  });

  return AppRouter;
});
