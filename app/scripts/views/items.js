define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/item'
], function ($, _, Backbone, JST, ItemView) {
  'use strict';

  var ItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/items.ejs'],

    tagName: 'section',

    id: 'items',

    render: function() {
      this.$el.html(this.template());
      var $tbody = this.$('tbody');
      this.itemViews = [];
      this.collection.each(function(item) {
        var itemView = new ItemView({ model: item });
        this.itemViews.push(itemView);
        $tbody.append(itemView.render().el);
      }, this);
      return this;
    },

    getSelectedItemIds: function() {
      var item_ids = [];
      _.each(this.itemViews, function(itemView) {
        if (itemView.isSelected()) {
          item_ids.push(itemView.itemId());
        }
      });
      return item_ids;
    }
  });

  return ItemsView;
});
