define([
  'models/user',
  'models/token'
], function (User, Token) {
  'use strict';

  var Authentication = {
    authenticate: function(options) {
      var
        user,
        userId = $.cookie('_jf_session_userId'),
        key = $.cookie('_jf_session_token'),

        authenticate = function(userId, key) {
          var header = { headers: { 'X-Toke-Key': key }},
              user = new User({ id: userId });
          user.on('sync', this.authenticated.bind(this));
          user.on('error', this.notAuthenticated.bind(this));
          user.fetch(header);
        }.bind(this);

      this.opts = options;

      if (userId && key) {
        authenticate(userId, key);
      } else {
        if (this.opts) { this.opts.fail() };
      }
    },

    authenticated: function(model, response, options) {
      var token = new Token(response.user.token);
      delete response.user.token;
      var user = new User(response.user);
      user.set('token', token);

      // this.listenTo(this.token, 'destroy', this.signedOut);
      $.cookie('_jf_session_token', token.get('key'));
      $.cookie('_jf_session_userId', user.get('id'));

      if (this.opts) { this.opts.success(user) };
      return user;
    },

    notAuthenticated: function(response) {
      $.removeCookie('_jf_session_token');
      $.removeCookie('_jf_session_userId');
      if (this.opts) { this.opts.fail() };
    }
  };

  return Authentication;
});