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
      this.collection.each(function(item) {
        $tbody.append(new ItemView({ model: item }).render().el);
      });
      return this;
    }
  });

  return ItemsView;
});
