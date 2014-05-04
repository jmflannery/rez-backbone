define([
  'underscore',
  'backbone',
  'models/bullet'
], function (_, Backbone, Bullet) {
  'use strict';

  var BulletCollection = Backbone.Collection.extend({
    model: Bullet,

    url: 'http://localhost:3000/rez/points?type=bullet',

    parse: function(response) {
      return response.points;
    }
  });

  return BulletCollection;
});
