define([
  'underscore',
  'backbone',
  'config'
], function (_, Backbone, config) {
  'use strict';

  var TokenModel = Backbone.Model.extend({
    urlRoot: config.domain + '/toke/sessions'
  });

  return TokenModel;
});
