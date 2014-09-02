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

    itemIds: function() {
      return this.get('items').map(function(item) {
        return item.id;
      });
    },

    parse: function(response) {
      if (response.section) {
        var resp = response.section;
      } else {
        var resp = response;
      }

      var options = { sectionId: this.id };
      resp.items = new ItemCollection(resp.items, options);

      return resp;
    }
  });

  return SectionModel;
});
