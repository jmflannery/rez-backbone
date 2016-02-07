define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewSectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_section.ejs'],

    tagName: 'section',

    id: 'new_section',

    urls: {
      editResume: '/resumes/:resumeId/edit'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.user = options.user;
      this.listenTo(this.collection, 'sync', this.sectionSynced);
    },

    events: {
      'click #save-section': 'saveSection',
      'click #cancel': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveSection: function(e) {
      e.preventDefault();
      Backbone.history.navigate(this.editResumeUrl());

      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.collection.create(this.newAttributes(), header);
      } else {
        console.log('Aint Authed');
      }
    },

    sectionSynced: function(model, response, options) {
      this.trigger('section:new:saved', model);
    },

    newAttributes: function() {
      return {
        name: this.$('#new-section-name').val(),
        heading: this.$('#new-section-heading').val(),
        subheading: this.$('#new-section-subheading').val()
      };
    },

    cancel: function(e) {
      e.preventDefault();
      Backbone.history.navigate(this.editResumeUrl());
      this.trigger('section:new:cancel');
    },

    editResumeUrl: function() {
      return this.urls['editResume'].replace(/:resumeId/, this.resume.id);
    }
  });

  return NewSectionView;
});
