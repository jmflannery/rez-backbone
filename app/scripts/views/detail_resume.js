define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume',
  'views/profile',
  'views/address'
], function ($, _, Backbone, JST, Resume, ProfileView, AddressView) {
  'use strict';

  var DetailResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/detail_resume.ejs'],

    id: 'resume',

    initialize: function(options) {
      this.auth = options.auth;
      if (this.model) {
        this.profileView = new ProfileView({ model: this.model.get('profile') });
        this.addressView = new AddressView({ model: this.model.get('address') });
      } else {
        this.profileView = new ProfileView({ model: null });
        this.addressView = new AddressView({ model: null });
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
      this.renderAddressView();
      return this;
    },

    renderProfileView: function() {
      this.$('section#profile').html(this.profileView.render().el);
    },

    renderAddressView: function() {
      this.$('section#address').html(this.addressView.render().el);
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
