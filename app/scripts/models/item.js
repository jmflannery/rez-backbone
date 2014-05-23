define([
  'underscore',
  'backbone',
  'jquery',
  'collections/bullet',
  'collections/paragraph'
], function (_, Backbone, $, BulletCollection, ParagraphCollection) {
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
      this.set('paragraphs', new ParagraphCollection(
        attributes.paragraphs
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
