define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var UserModel = Backbone.Model.extend({
    defaults: {
      username: ''
    },

    urlRoot: 'http://localhost:3000/toke/users',

    toJSON: function() {
      return {
        user: this.attributes
      };
    }
  });

  return UserModel;
});
