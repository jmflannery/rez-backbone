define([
  'underscore',
  'backbone',
  'models/resource',
], function (_, Backbone, Resource) {
  'use strict';

  var BulletModel = Resource.extend({
    resource: 'point',

    url: function() {
      if (this.id) {
        return 'http://localhost:3000/rez/points/' + this.id + '?type=bullet';
      } else {
        return 'http://localhost:3000/rez/points?type=bullet';
      }
    },

    defaults: {
      text: ''
    },

    parse: function(response, options) {
      if (response.point) {
        return response.point;
      } else {
        return response;
      }
    }
  });

  return BulletModel;
});
