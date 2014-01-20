define([
  'underscore',
  'backbone',
  'models/bullet'
], function (_, Backbone, Bullet) {
  'use strict';

  var BulletCollection = Backbone.Collection.extend({
    model: Bullet,

    initialize: function(options) {
      if (options) {
        this.auth = options.auth;
        this.item = options.parent;
      }
    },

    url: function() {
      if (this.item) {
        return 'http://localhost:3000/rez/items/' + this.item.id + '/points?type=bullet';
      } else {
        return 'http://localhost:3000/rez/points?type=bullet';
      }
    },

    parse: function(response) {
      return response.bullets;
    }
  });

  return BulletCollection;
});
