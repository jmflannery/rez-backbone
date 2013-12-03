define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var TokenModel = Backbone.Model.extend({
    defaults: {
      key: '',
      expires_at: ''
    }
  });

  return TokenModel;
});
