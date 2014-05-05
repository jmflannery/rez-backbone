define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/show/item'
], function ($, _, Backbone, JST, ItemView) {
  'use strict';

  var ItemsView = Backbone.View.extend({
    tagName: 'section',

    id: 'items',

    render: function() {
      this.$el.empty();
      if (this.collection) {
        this.collection.forEach(function(item) {
          var div = new ItemView({ model: item });
          this.$el.append(div.render().el);
        }, this);
      }
      return this;
    }
  });

  return ItemsView;
});
