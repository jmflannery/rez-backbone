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

    events: {
      'click #edit_item': 'editItem',
      'click #delete_item': 'destroyItem'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    editItem: function(e) {
      e.preventDefault();
      this.trigger('item:edit', this.model);
    },

    destroyItem: function(e) {
      e.preventDefault();
      console.log('destroy item ' + this.model.id);
    },

    isSelected: function() {
      return this.$('input[type=checkbox]').is(':checked');
    },

    itemId: function() {
      return this.model.id;
    }
  });

  return ItemView;
});
