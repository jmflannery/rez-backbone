define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume'
], function ($, _, Backbone, JST, Resume) {
  'use strict';

  var NewResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_resume.ejs'],

    tagName: 'section',

    id: 'new_resume',

    events: {
      'submit': 'addResume'
    },

    initialize: function(resumes, auth) {
      this.resumes = resumes; 
      this.auth = auth;
      this.listenTo(this.resumes, 'add', this.resumeAdded);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    addResume: function(e) {
      e.preventDefault();
      var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
      this.resumes.create(this.newAttributes(), header);
    },

    resumeAdded: function(model, collection, options) {
      this.listenToOnce(model, 'sync', this.resumeSynced);
    },

    resumeSynced: function(model, response, options) {
      this.trigger('show:detail_resume', model);
    },

    newAttributes: function() {
      return {
        resume: {
          name: this.$('#new_resume_name').val()
        }
      };
    }
  });

  return NewResumeView;
});
