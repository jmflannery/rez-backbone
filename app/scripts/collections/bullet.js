define([
  'underscore',
  'backbone',
  'models/bullet',
  'config'
], function (_, Backbone, Bullet, config) {
  'use strict';

  var BulletCollection = Backbone.Collection.extend({
    model: Bullet,

    initialize: function(models, options) {
      if (options) {
        this.item = options.item;
      }
    },

    url: function() {
      if (this.item) {
        return config.domain + '/rez/items/' + this.item.id + '/points?type=bullet';
      } else {
        return config.domain + '/rez/points?type=bullet';
      }
    },

    parse: function(response) {
      return response.points;
    }
  });

  return BulletCollection;
});
