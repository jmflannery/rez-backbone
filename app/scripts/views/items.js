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

    initialize: function(options) {
      this.selected = options.selected;
    },

    render: function() {
      this.$el.html(this.template());
      var $tbody = this.$('tbody');
      this.itemViews = [];

      this.collection.each(function(item) {
        var itemView = new ItemView({ model: item });
        this.listenToOnce(itemView, 'item:edit', function(item) {
          this.trigger('edit:item', item);
        });
        this.itemViews.push(itemView);
        $tbody.append(itemView.render().el);
      }, this);

      this.setItemsSelected();
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
    },

    setItemsSelected: function() {
      _.each(this.selected, function(item_id) {
        this.$('tr#item_' + item_id + ' input[type=checkbox]').prop('checked', true);
      }, this);
    }
  });

  return ItemsView;
});
