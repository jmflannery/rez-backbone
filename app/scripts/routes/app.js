define([
  'jquery',
  'backbone',
  'views/app',
  'jquery.cookie'
], function ($, Backbone, AppView) {
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
      'resumes/:id': 'resume',
      'new_resume': 'new_resume'
    },

    home: function() {
      new AppView(this.vent, 'home');
    },

    signin: function() {
      new AppView(this.vent, 'signin');
    },

    activeResume: function() {
      new AppView(this.vent, 'active_resume');
    },

    resume: function(resumeId) {
      console.log('showing detailed resume: ' + resumeId);
      new AppView(this.vent, 'resume', resumeId);
    },

    resumes: function() {
      new AppView(this.vent, 'resumes');
    },

    new_resume: function() {
      console.log('new resume');
      new AppView(this.vent, 'new_resume');
    }
  });

  return AppRouter;
});
