define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_item.ejs'],

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return NewItemView;
});
