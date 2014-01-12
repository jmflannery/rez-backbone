define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ItemModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/items',

    defaults: {
      name: '',
      title: '',
      heading: ''
    },

    parse: function(response) {
      if (response.item) {
        return response.item;
      } else {
        return response;
      }
    },

    toJSON: function() {
      return {
        item: this.attributes
      };
    }
  });

  return ItemModel;
});
