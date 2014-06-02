define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var BulletModel = Backbone.Model.extend({
    defaults: {
      text: ''
    },

    url: function() {
      var url = 'http://localhost:3000/rez/points';
      if (this.id) {
        url += '/' + this.id;
      }
      return url;
    },

    toJSON: function() {
      return {
        point: this.attributes
      };
    },

    parse: function(response) {
      if (response.point) {
        return response.point;
      } else {
        return response;
      }
    }
  });

  return BulletModel;
});
