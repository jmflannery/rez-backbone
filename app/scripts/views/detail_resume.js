define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume',
], function ($, _, Backbone, JST, Resume) {
  'use strict';

  var DetailResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/detail_resume.ejs'],
    authenticatedTemplate: JST['app/scripts/templates/authenticated_resume.ejs'],

    id: 'resume',

    initialize: function(options) {
      this.auth = options.auth;
    },

    events: {
      'click .new_resume': 'showNewResume',
      'click .resumes': 'showResumes'
    },

    render: function() {
      if (this.auth) {
        this.$el.html(this.authenticatedTemplate());
      } else {
        this.$el.html(this.template());
      }

      return this;
    },

    showNewResume: function(e) {
      e.preventDefault();
      this.trigger('show:new_resume');
    },

    showResumes: function(e) {
      e.preventDefault();
      this.trigger('show:resumes');
    }
  });

  return DetailResumeView;
});
