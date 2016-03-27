define([
  'underscore',
  'backbone',
  'models/paragraph',
  'config'
], function (_, Backbone, Paragraph, config) {
  'use strict';

  var ParagraphsCollection = Backbone.Collection.extend({
    model: Paragraph,

    initialize: function(models, options) {
      if (options) {
        this.item = options.item;
      }
    },

    url: function() {
      if (this.item) {
        return config.domain + '/rez/items/' + this.item.id + '/points?type=paragraph';
      } else {
        return config.domain + '/rez/points?type=paragraph';
      }
    },

    parse: function(response) {
      return response.points;
    }
  });

  return ParagraphsCollection;
});
