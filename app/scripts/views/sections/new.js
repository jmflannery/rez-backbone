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

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.collection, 'sync', this.sectionSynced);
    },

    events: {
      'click #save_section': 'saveSection',
      'click #cancel': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveSection: function(e) {
      e.preventDefault();
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
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
        name: this.$('#new_section_name').val(),
        heading: this.$('#new_section_heading').val(),
        subheading: this.$('#new_section_subheading').val()
      };
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('section:new:cancel');
    }
  });

  return NewSectionView;
});
