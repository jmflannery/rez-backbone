define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/profiles/profile',
  'views/addresses/address',
  'views/sections/sections'
], function ($, _, Backbone, JST, ProfileView, AddressView, SectionsView) {
  'use strict';

  var ResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/show_resume.ejs'],

    id: 'resume',

    events: {
      'click .new_resume': 'showNewResume',
      'click .resumes': 'showResumes',
      'click .edit_resume': 'showEditResume'
    },

    initialize: function(options) {
      this.user = options.user;
      this.initSubViews();
    },

    initSubViews: function() {
      if (this.model) {
        this.profileView = new ProfileView({ model: this.model.get('profile') });
        this.addressView = new AddressView({ model: this.model.get('address') });
        this.sectionsView = new SectionsView({ collection: this.model.get('sections') });
      } else {
        this.profileView = new ProfileView({ model: null });
        this.addressView = new AddressView({ model: null });
        this.sectionsView = new SectionsView({ collection: null });
      }
    },

    render: function() {
      this.$el.html(this.template());
      this.renderProfileView();
      this.renderAddressView();
      this.renderSectionsView();
      return this;
    },

    renderProfileView: function() {
      this.$el.append(this.profileView.render().el);
    },

    renderAddressView: function() {
      this.$el.append(this.addressView.render().el);
    },

    renderSectionsView: function() {
      this.$el.append(this.sectionsView.render().el);
    },

    showNewResume: function(e) {
      Backbone.history.navigate('resumes/new', true);
      e.preventDefault();
    },

    showResumes: function(e) {
      Backbone.history.navigate('resumes', true);
      e.preventDefault();
    },

    showEditResume: function(e) {
      e.preventDefault();
      this.trigger('resume:edit:show', this.model.id);
    }
  });

  return ResumeView;
});
