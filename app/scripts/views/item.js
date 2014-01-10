define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/item.ejs'],

    tagName: 'tr',

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return ItemView;
});
