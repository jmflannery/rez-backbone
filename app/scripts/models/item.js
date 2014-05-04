define([
  'underscore',
  'backbone',
  'jquery',
  'collections/bullet'
], function (_, Backbone, $, BulletCollection) {
  'use strict';

  var ItemModel = Backbone.Model.extend({
    defaults: {
      name: '',
      title: '',
      heading: ''
    },

    initialize: function(attributes, options) {
      this.set('bullets', new BulletCollection(
        attributes.bullets
      ));
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
