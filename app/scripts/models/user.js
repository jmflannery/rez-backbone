define([
  'underscore',
  'backbone',
  'config'
], function (_, Backbone, config) {
  'use strict';

  var UserModel = Backbone.Model.extend({
    defaults: {
      username: ''
    },

    urlRoot: config.domain + '/toke/users',

    toJSON: function() {
      return {
        user: this.attributes
      };
    }
  });

  return UserModel;
});
