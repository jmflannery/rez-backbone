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
      'resume': 'resume',
      'resumes': 'resumes',
      'new_resume': 'new_resume'
    },

    home: function() {
      new AppView(this.vent, 'home');
    },

    signin: function() {
      new AppView(this.vent, 'signin');
    },

    resume: function() {
      new AppView(this.vent, 'resume');
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
