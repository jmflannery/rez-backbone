define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_section.ejs'],

    tagName: 'tr',

    id: function() {
      return 'section_' + this.model.id;
    },

    events: {
      'click #edit_section': 'edit',
      'click #delete_section': 'destroy'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.user = options.user;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    sectionId: function() {
      return this.model.id;
    },

    edit: function(e) {
      e.preventDefault();
      Backbone.history.navigate(this.editSectionUrl());
      this.trigger('section:edit', this.model.id);
    },

    destroy: function(e) {
      e.preventDefault();
      if (this.user) {
        var header = { headers: {'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized');
      }
    },

    isSelected: function() {
      return this.$('input[type=checkbox]').is(':checked');
    },

    editSectionUrl: function() {
      return ("resumes/:resumeId/sections/:sectionId/edit"
        .replace(/:resumeId/, this.resume.id)
        .replace(/:sectionId/, this.model.id));
    }
  });

  return SectionView;
});
