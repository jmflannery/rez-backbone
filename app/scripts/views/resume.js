define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume',
  'collections/resume'
], function ($, _, Backbone, JST, Resume, ResumeCollection) {
  'use strict';

  var ResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/resume.ejs'],

    id: 'resume',

    initialize: function(vent, auth) {
      this.vent = vent;
      this.auth = auth;
      this.resumes = new ResumeCollection();
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
        this.resumes.fetch(header);
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    resumeCount: function() {
      return this.resumes.length === 0 ? 'No' : this.resumes.length.toString();
    }
  });

  return ResumeView;
});
