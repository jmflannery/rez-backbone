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
      this.$el.append(new ItemsView({ collection: this.collection }).render().el);
      return this;
    },

    newItem: function(e) {
      e.preventDefault();
      this.trigger('show:new:item');
    }
  });

  return SelectItemsView;
});
