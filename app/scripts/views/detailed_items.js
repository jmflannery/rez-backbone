define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var DetailedItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/detailed_items.ejs'],

    tagName: 'section',

    id: 'items',

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return DetailedItemsView;
});
