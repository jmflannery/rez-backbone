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

    initialize: function() {
      this.on('session:authenticated', this.authenticated, this);
    },

    authenticate: function() {
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
      new User({ id: this.token.get('user_id') }).fetch().then(function(response) {
        this.trigger("session:authenticated", response.user);
      }.bind(this));
    },

    authenticated: function(user) {
      this.user = new User(user);
    },

    notAthenticated: function() {
      console.log('failure');
    }
  });

  return SessionModel;
});
