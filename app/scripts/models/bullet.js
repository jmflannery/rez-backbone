define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var BulletModel = Backbone.Model.extend({
    defaults: {
      text: ''
    }
  });

  return BulletModel;
});
