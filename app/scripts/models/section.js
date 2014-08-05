define([
  'underscore',
  'backbone',
  'models/resource',
  'collections/item'
], function (_, Backbone, Resource, ItemCollection) {
  'use strict';

  var SectionModel = Resource.extend({

    resource: 'section',
    hasMany: ['items'],

    defaults: {
    },

    initialize: function(attributes, options) {
      this.set('items', new ItemCollection(
        attributes.items
      ));
    },

    itemIds: function() {
      return this.get('items').map(function(item) {
        return item.id;
      });
    },

    parse: function(response) {
      if (response.section) {
        return response.section;
      } else {
        return response;
      }
    }
  });

  return SectionModel;
});
