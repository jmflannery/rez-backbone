define([
  'underscore',
  'backbone',
  'models/item'
], function (_, Backbone, Item) {
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
        return 'http://localhost:3000/rez/sections/' + this.section.id + '/items';
      } else {
        return 'http://localhost:3000/rez/items';
      }
    },

    parse: function(response, options) {
      return response.items;
    }
  });

  return ItemCollection;
});
