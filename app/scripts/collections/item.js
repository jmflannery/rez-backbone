define([
  'underscore',
  'backbone',
  'models/item'
], function (_, Backbone, ItemModel) {
  'use strict';

  var ItemCollection = Backbone.Collection.extend({
    model: ItemModel,

    initialize: function(options) {
      if (options) {
        this.resume = options.parent;
      }
    },

    url: function() {
      if (this.resume) {
        return 'http://localhost:3000/rez/resumes/' + this.resume.id + '/items';
      } else {
        return 'http://localhost:3000/rez/items';
      }
    },

    parse: function(response) {
      return response.items;
    }
  });

  return ItemCollection;
});
