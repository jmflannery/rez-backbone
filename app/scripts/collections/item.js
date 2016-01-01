define([
  'underscore',
  'backbone',
  'models/item',
  'config'
], function (_, Backbone, Item, config) {
  'use strict';

  var ItemCollection = Backbone.Collection.extend({
    model: Item,

    initialize: function(models, options) {
      if (options) {
        this.section = options.section;
      }
    },

    url: function() {
      if (this.section) {
        return config.domain + '/rez/sections/' + this.section.id + '/items';
      } else {
        return config.domain + '/rez/items';
      }
    },

    parse: function(response, options) {
      return response.items;
    }
  });

  return ItemCollection;
});
