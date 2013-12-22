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
      'submit': 'add_resume'
    },

    initialize: function(resumes) {
      this.resumes = resumes; 
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    add_resume: function() {
      console.log(this.new_attrs());
      this.resumes.create(this.new_attrs());
    },

    new_attrs: function() {
      return {
        name: this.$('#new_resume_name').val()
      };
    }
  });

  return NewResumeView;
});
