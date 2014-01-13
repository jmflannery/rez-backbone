define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume',
  'views/profile',
  'views/address',
  'views/detailed_items',
  'collections/item'
], function ($, _, Backbone, JST, Resume, ProfileView, AddressView, DetailedItemsView, ItemCollection) {
  'use strict';

  var DetailResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/detail_resume.ejs'],

    id: 'resume',

    events: {
      'click .new_resume': 'showNewResume',
      'click .resumes': 'showResumes',
      'click .edit_resume': 'showEditResume'
    },

    initialize: function(options) {
      this.auth = options.auth;
      this.itemCollection = new ItemCollection();

      $.when(
        this.itemCollection.fetch({ data: { resume_id: this.model.id }})
      ).then(this.initSubViews.bind(this));
    },

    initSubViews: function() {
      if (this.model) {
        this.profileView = new ProfileView({ model: this.model.get('profile') });
        this.addressView = new AddressView({ model: this.model.get('address') });
        this.itemsView = new DetailedItemsView({ collection: this.itemCollection });
      } else {
        this.profileView = new ProfileView({ model: null });
        this.addressView = new AddressView({ model: null });
        this.itemsView = new DetailedItemsView({ collection: null });
      }
      this.trigger('resume:ready');
    },

    render: function() {
      this.$el.html(this.template());
      this.renderProfileView();
      this.renderAddressView();
      this.renderItemsView();
      return this;
    },

    renderProfileView: function() {
      this.$el.append(this.profileView.render().el);
    },

    renderAddressView: function() {
      this.$el.append(this.addressView.render().el);
    },

    renderItemsView: function() {
      this.$el.append(this.itemsView.render().el);
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
