define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ParagraphModel = Backbone.Model.extend({
    defaults: {
      text: ''
    },

    toJSON: function() {
      return {
        paragraph: this.attributes
      };
    },

    parse: function(response) {
      if (response.paragraph) {
        return response.paragraph;
      } else {
        return response;
      }
    }
  });

  return ParagraphModel;
});
