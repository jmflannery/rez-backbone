define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/detailed_item'
], function ($, _, Backbone, JST, DetailedItemView) {
  'use strict';

  var DetailedItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/detailed_items.ejs'],

    tagName: 'section',

    id: 'items',

    render: function() {
      this.$el.empty();
      if (this.collection) {
        this.collection.forEach(function(item) {
          var div = new DetailedItemView({ model: item });
          this.$el.append(div.render().el);
        }, this);
      }
      return this;
    }
  });

  return DetailedItemsView;
});
