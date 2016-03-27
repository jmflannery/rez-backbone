define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/items/items'
], function ($, _, Backbone, JST, ItemsView) {
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
      this.itemsView = new ItemsView({
        collection: this.model.get('items')
      });
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.append(this.itemsView.render().el);
      return this;
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
      Backbone.history.navigate('resumes/' + this.model.id + '/edit', true);
      e.preventDefault();
    }
  });

  return ResumeView;
});
