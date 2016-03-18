define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/item.ejs'],

    tagName: 'tr',

    id: function() {
      return 'item_' + this.model.id;
    },

    urls: {
      editItem: '/resumes/:resumeId/sections/:sectionId/items/:itemId/edit'
    },

    events: {
      'click #edit_item': 'edit',
      'click #delete_item': 'destroy'
    },

    initialize: function(options) {
      this.section = options.section;
      this.resume = options.resume;
      this.user = options.user;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    edit: function(e) {
      e.preventDefault();
      Backbone.history.navigate(this.editItemUrl());
      this.trigger('item:edit', this.model.id);
    },

    destroy: function(e) {
      e.preventDefault();
      console.log(this.user);
      if (this.user) {
        var header = { headers: {'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized, Sucka');
      }
    },

    isSelected: function() {
      return this.$('input[type=checkbox]').is(':checked');
    },

    itemId: function() {
      return this.model.id;
    },

    editItemUrl: function() {
      return '/resumes/:resumeId/sections/:sectionId/items/:itemId/edit'
        .replace(/:resumeId/, this.resume.id)
        .replace(/:sectionId/, this.section.id)
        .replace(/:itemId/, this.model.id);
    }
  });

  return ItemView;
});
