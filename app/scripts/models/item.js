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
        _.select(attributes.points, function(point) {
          return point.point_type === 'bullet';
        })
      ));
      this.set('paragraphs', new ParagraphCollection(
        _.select(attributes.points, function(point) {
          return point.point_type === 'paragraph';
        })
      ));
    },

    bulletIds: function() {
      return this.get('bullets').map(function(bullet) {
        return bullet.id;
      });
    },

    paragraphIds: function() {
      return this.get('paragraphs').map(function(paragraph) {
        return paragraph.id;
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
