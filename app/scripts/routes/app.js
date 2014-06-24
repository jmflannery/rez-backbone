define([
  'backbone'
], function (Backbone) {
  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(vent) {
      this.vent = vent;
    },

    routes: {
      '': 'home',
      'signin': 'signin',
      'resume': 'activeResume',
      'resumes': 'resumes',
      'resumes/new': 'newResume',
      'resumes/:id': 'resume',
      'resumes/:id/edit': 'editResume',
      'resumes/:resume_id/items/:item_id/edit': 'editResumeItem',
      'resumes/:resume_id/items/:item_id/bullets/new': 'newResumeItemBullet',
      'resumes/:resume_id/items/:item_id/paragraphs/new': 'newResumeItemParagraph',
      'resumes/:resume_id/items/:item_id/bullets/:bullet_id/edit': 'editResumeItemBullet'
    },

    home: function() {
      this.vent.trigger('show:home');
    },

    signin: function() {
      this.vent.trigger('show:signin');
    },

    activeResume: function() {
      this.vent.trigger('show:active_resume');
    },

    resume: function(resumeId) {
      this.vent.trigger('show:resume', resumeId);
    },

    resumes: function() {
      this.vent.trigger('show:resumes');
    },

    newResume: function() {
      this.vent.trigger('show:new_resume');
    },

    editResume: function(resumeId) {
      this.vent.trigger('show:resume:edit', resumeId);
    },

    editResumeItem: function(resumeId, itemId) {
      this.vent.trigger('show:resume:item:edit', resumeId, itemId);
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
