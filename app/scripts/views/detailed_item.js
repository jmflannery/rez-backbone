define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var DetailedItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/detailed_item.ejs'],

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return DetailedItemView;
});
