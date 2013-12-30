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
    },

    parse: function(response) {
      if (response.profile) {
        return response.profile;
      } else {
        return response;
      }
    }
  });

  return ProfileModel;
});
