define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/items'
], function ($, _, Backbone, JST, ItemsView) {
  'use strict';

  var SelectItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_items.ejs'],

    events: {
      'click .new_item': 'newItem'
    },

    render: function() {
      this.$el.html(this.template());
      this.itemsView = new ItemsView({ collection: this.collection }); 
      this.$el.append(this.itemsView.render().el);
      return this;
    },

    getSelectedItemIds: function() {
      return this.itemsView.getSelectedItemIds();
    },

    newItem: function(e) {
      e.preventDefault();
      this.trigger('show:new:item');
    }
  });

  return SelectItemsView;
});
