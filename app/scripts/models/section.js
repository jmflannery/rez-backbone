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
      this.set('items', new ItemCollection(attributes.items, { section: this }));
    },

    itemIds: function() {
      return this.get('items').map(function(item) {
        return item.id;
      });
    },

    parse: function(response, options) {
      if (response.section) {
        var resp = response.section;
      } else {
        var resp = response;
      }

      if (this.id) {
        resp.items = new ItemCollection(resp.items, { section: this });
      }

      return resp;
    }
  });

  return SectionModel;
});
