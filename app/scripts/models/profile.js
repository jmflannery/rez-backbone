define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  var ProfileModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/profiles',

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
    }
  });

  return ProfileModel;
});
