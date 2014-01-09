define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_items.ejs'],

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return SelectItemsView;
});
