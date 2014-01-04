define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume',
  'views/profile'
], function ($, _, Backbone, JST, Resume, ProfileView) {
  'use strict';

  var DetailResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/detail_resume.ejs'],

    id: 'resume',

    initialize: function(options) {
      this.auth = options.auth;
      if (this.model) {
        this.profileView = new ProfileView({ model: this.model.get('profile') });
      } else {
        this.profileView = new ProfileView({ model: null });
      }
    },

    events: {
      'click .new_resume': 'showNewResume',
      'click .resumes': 'showResumes',
      'click .edit_resume': 'showEditResume'
    },

    render: function() {
      this.$el.html(this.template());
      this.renderProfileView();
      return this;
    },

    renderProfileView: function() {
      this.$('section#profile').html(this.profileView.render().el);
    },

    showNewResume: function(e) {
      e.preventDefault();
      this.trigger('show:new_resume');
    },

    showResumes: function(e) {
      e.preventDefault();
      this.trigger('show:resumes');
    },

    showEditResume: function(e) {
      e.preventDefault();
      this.trigger('show:edit_resume', this.model.id);
    }
  });

  return DetailResumeView;
});
