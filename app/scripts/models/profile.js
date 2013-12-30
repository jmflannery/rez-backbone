define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  var ProfileModel = Backbone.Model.extend({
    defaults: {
      firstname: '',
      middlename: '',
      lastname: '',
      nickname: '',
      prefix: '',
      suffix: '',
      title: ''
    }
  });

  return ProfileModel;
});
