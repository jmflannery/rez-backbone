define([
  'underscore',
  'backbone',
  'models/paragraph',
  'config'
], function (_, Backbone, Paragraph, config) {
  'use strict';

  var ParagraphsCollection = Backbone.Collection.extend({
    model: Paragraph,

    url: config.domain + '/rez/points?type=paragraph',

    parse: function(response) {
      return response.points;
    }
  });

  return ParagraphsCollection;
});
