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
      this.set('items', new ItemCollection(attributes.items, {}));
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
        var options = { sectionId: this.id };
        resp.items = new ItemCollection(resp.items, options);
      }

      return resp;
    }
  });

  return SectionModel;
});
