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
      'resumes/:resume_id/items/:item_id/edit': 'editResumeItem'
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
      this.vent.trigger('show:edit_resume', resumeId);
    },

    editResumeItem: function(resumeId, itemId) {
      this.vent.trigger('show:edit_resume_item', resumeId, itemId);
    }
  });

  return AppRouter;
});
