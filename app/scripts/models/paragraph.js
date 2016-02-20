define([
  'underscore',
  'backbone',
  'config'
], function (_, Backbone, config) {
  'use strict';

  var ParagraphModel = Backbone.Model.extend({
    defaults: {
      text: ''
    },

    url: function() {
      if (this.id) {
        return config.domain + '/rez/points/' + this.id + '?type=paragraph';
      } else {
        return config.domain + '/rez/points?type=paragraph';
      }
    },

    toJSON: function() {
      return {
        point: this.attributes
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
