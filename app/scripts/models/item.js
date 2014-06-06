define([
  'underscore',
  'jquery',
  'models/resource',
  'collections/bullet',
  'collections/paragraph'
], function (_, $, Resource, BulletCollection, ParagraphCollection) {
  'use strict';

  var ItemModel = Resource.extend({
    defaults: {
      name: '',
      title: '',
      heading: ''
    },

    resource: 'item',
    hasMany: ['bullets', 'paragraphs'],

    initialize: function(attributes, options) {
      this.set('bullets', new BulletCollection(
        attributes.bullets
      ));
      this.set('paragraphs', new ParagraphCollection(
        attributes.paragraphs
      ));
    },

    bulletIds: function() {
      return this.get('bullets').map(function(bullet) {
        return bullet.id;
      });
    },

    parse: function(response) {
      if (response.item) {
        return response.item;
      } else {
        return response;
      }
    }
  });

  return ItemModel;
});
