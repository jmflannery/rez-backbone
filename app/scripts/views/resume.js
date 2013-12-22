define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume',
], function ($, _, Backbone, JST, Resume) {
  'use strict';

  var ResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/resume.ejs'],
    authenticatedTemplate: JST['app/scripts/templates/authenticated_resume.ejs'],

    id: 'resume',

    initialize: function(options) {
      this.auth = options.auth;
    },

    events: {
      'click .new_resume': 'showNewResume'
    },

    render: function() {
      if (this.auth) {
        this.$el.html(this.authenticatedTemplate());
      } else {
        this.$el.html(this.template());
      }

      return this;
    },

    showNewResume: function() {
      this.trigger('show:new_resume');
    }
  });

  return ResumeView;
});
