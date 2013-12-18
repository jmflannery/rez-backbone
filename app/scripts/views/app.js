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

    initialize: function(vent, current_page) {
      this.vent = vent;
      this.current_page = current_page;
      this.vent.on('session:authenticated', this.authenticated.bind(this));
      this.vent.on('session:destroy', this.signout.bind(this));
      this.nav_view = new NavView(this.vent);
      this.content_view = new ContentView(this.vent, current_page);
      this.render();
      var user_id = $.cookie('_jf_session_user_id');
      var key = $.cookie('_jf_session_token');
      if (user_id && key) {
        this.authenticate(user_id, key, current_page);
      } else {
        if (current_page) {
          this.vent.trigger('show:' + current_page);
        }
      }
    },

    render: function() {
      this.$el.html(this.nav_view.render().el);
      this.$el.append(this.content_view.render().el);
      return this;
    },

    authenticate: function(user_id, key) {
      var header = { headers: { 'X-Toke-Key': key }};
      new User({ id: user_id }).fetch(header).then(function(response) {
        this.vent.trigger('session:authenticated', response, this.current_page);
      }.bind(this));
    },

    authenticated: function(obj, current_page) {
      this.token = new Token(obj.user.token);
      delete obj.user.token;
      this.user = new User(obj.user);
      $.cookie('_jf_session_token', this.token.get('key'));
      $.cookie('_jf_session_user_id', this.user.get('id'));
      this.nav_view.userAuthenticated(this.user.get('username'));
      this.content_view.set_auth({ current_user: this.user, token: this.token });
      this.vent.trigger('show:' + current_page);
    },

    signout: function() {
      var header = { headers: {'X-Toke-Key': this.token.get('key') }};
      this.token.destroy(header).done(function(response) {
        $.removeCookie('_jf_session_token');
        $.removeCookie('_jf_session_user_id');
        this.nav_view.userSignedOut();
        this.content_view.destroy_auth();
      }.bind(this)).fail(function(response) {
        console.log(response);
      });
    }
  });

  return AppView;
});
