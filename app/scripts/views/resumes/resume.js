define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/sections/section'
], function ($, _, Backbone, JST, SectionView) {
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
    },

    render: function() {
      this.$el.html(this.template());
      this.renderSectionsView();
      return this;
    },

    renderSectionsView: function() {
      if (this.model.get('sections')) {
        this.model.get('sections').forEach(function(section) {
          var div = new SectionView({ model: section });
          this.$el.append(div.render().el);
        }, this);
      }
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
