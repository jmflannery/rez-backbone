define([
  'underscore',
  'backbone',
  'models/token'
], function (_, Backbone, Token) {
  'use strict';

  var SessionModel = Backbone.Model.extend({
    defaults: {
      username: '',
      password: '',
      token: {}
    },

    authenticate: function() {
      console.log('Starting the Authentication process');
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/toke/sessions',
        dataType: 'json',
        data: {
          session: {
            username: this.get('username'),
            password: this.get('password')
          }
        },
        success: this.authenticating.bind(this),
        error: this.notAuthenticated
      });
    },

    authenticating: function(response) {
      this.token = new Token(response.token);
    },

    notAthenticated: function() {
      console.log('failure');
    }
  });

  return SessionModel;
});
