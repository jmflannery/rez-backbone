define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var TokenModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/toke/sessions'
  });

  return TokenModel;
});
