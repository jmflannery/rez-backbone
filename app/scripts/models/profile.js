define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ProfileModel = Backbone.Model.extend({

    initialize: function(options) {
      this.resumeId = options.resumeId;
    },

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
    },

    fullName: function() {
      return this.get('firstname') + ' ' + this.get('middlename') + ' ' + this.get('lastname');
    },

    fullNickName: function() {
      return this.get('nickname') + ' ' + this.get('lastname');
    },

    fullNickNameWithSuffix: function() {
      return this.get('nickname') + ' ' + this.get('lastname') + ' ' + this.get('suffix');
    }
  });

  return ProfileModel;
});
