define([
  'underscore',
  'backbone',
  'models/token',
  'models/user'
], function (_, Backbone, Token, User) {
  'use strict';

  var SessionModel = Backbone.Model.extend({
    defaults: {
      username: '',
      password: '',
      token: {}
    },

    authenticate: function() {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/toke/sessions',
        dataType: 'json',
        data: {
          session: {
            username: this.get('username'),
            password: this.get('password')
          }
        },
        success: this.authenticated.bind(this),
        error: this.not_authenticated
      });
    },

    authenticated: function(response) {
      this.token = new Token(response.user.token);
      delete response.user.token;
      this.user = new User(response.user);
      this.trigger("session:authenticated");
    },

    not_athenticated: function() {
      console.log('failure');
    }
  });

  return SessionModel;
});
