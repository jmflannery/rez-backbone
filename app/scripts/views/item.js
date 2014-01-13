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

    render: function() {
      this.$el.html(this.template());
      return this;
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
