define([
  'underscore',
  'backbone',
  'models/item'
], function (_, Backbone, ItemModel) {
  'use strict';

  var ItemCollection = Backbone.Collection.extend({
    model: ItemModel,

    url: 'http://localhost:3000/rez/items',

    parse: function(response) {
      return response.items;
    }
  });

  return ItemCollection;
});
