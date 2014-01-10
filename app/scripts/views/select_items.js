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

    render: function() {
      this.$el.html(this.template());
      this.$el.append(new ItemsView({ collection: this.collection }).render().el);
      return this;
    }
  });

  return SelectItemsView;
});
