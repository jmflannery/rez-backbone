define([
  'underscore',
  'backbone',
  'models/resource',
  'config'
], function (_, Backbone, Resource, config) {
  'use strict';

  var BulletModel = Resource.extend({
    resource: 'point',

    defaults: {
      text: ''
    },

    url: function() {
      if (this.id) {
        return config.domain + '/rez/points/' + this.id
      } else {
        return config.domain + '/rez/points';
      }
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
