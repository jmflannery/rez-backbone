define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var BulletModel = Backbone.Model.extend({
    defaults: {
      text: ''
    },

    toJSON: function() {
      return {
        point: this.attributes
      };
    }
  });

  return BulletModel;
});
