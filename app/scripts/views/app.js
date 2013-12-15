define([
  'jquery',
  'underscore',
  'backbone',
  'views/nav',
  'views/content',
  'models/user',
  'models/token'
], function ($, _, Backbone, NavView, ContentView, User, Token) {
  'use strict';

  var AppView = Backbone.View.extend({

    el: '#page',

    initialize: function(vent) {
      this.vent = vent;
      this.vent.on('session:authenticated', this.authenticated.bind(this));
      this.vent.on('session:destroy', this.signout.bind(this));
      this.nav_view = new NavView(this.vent);
      this.content_view = new ContentView(this.vent);
      var user_id = $.cookie('_jf_session_user_id');
      var key = $.cookie('_jf_session_token');
      if (user_id && key) {
        this.authenticate(user_id, key);
      }
    },

    render: function() {
      this.$el.html(this.nav_view.render().el);
      this.$el.append(this.content_view.render().el);
      return this;
    },

    authenticate: function(user_id, key) {
      var header = { headers: {'X-Toke-Key': key }};
      new User({ id: user_id }).fetch(header).then(function(response) {
        this.token = new Token(response.user.token);
        delete response.user.token;
        this.user = new User(response.user);
        this.nav_view.userAuthenticated(this.user.get('username'));
      }.bind(this));
    },

    authenticated: function(user, token) {
      this.user = user;
      this.token = token;
      this.nav_view.userAuthenticated(this.user.get('username'));
      Backbone.history.navigate('/');
      this.content_view.showHome();
    },

    signout: function() {
      var header = { headers: {'X-Toke-Key': this.token.get('key') }};
      this.token.destroy(header).done(function(response) {
        $.removeCookie('_jf_session_token');
        $.removeCookie('_jf_session_user_id');
        this.nav_view.userSignedOut();
      }.bind(this)).fail(function(response) {
        console.log(response);
      });
    }
  });

  return AppView;
});
