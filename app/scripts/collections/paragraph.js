define([
  'underscore',
  'backbone',
  'models/paragraph'
], function (_, Backbone, Paragraph) {
  'use strict';

  var ParagraphsCollection = Backbone.Collection.extend({
    model: Paragraph,

    url: 'http://localhost:3000/rez/points?type=paragraph',

    parse: function(response) {
      return response.points;
    }
  });

  return ParagraphsCollection;
});
