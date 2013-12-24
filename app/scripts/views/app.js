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
      this.vent.on('session:destroy', this.signOut.bind(this));

      this.navView = new NavView(this.vent);
      this.contentView = new ContentView(this.vent);

      this.listenTo(this.contentView, 'content:loaded', this.contentLoaded);

      this.render();

      var userId = $.cookie('_jf_session_userId');
      var key = $.cookie('_jf_session_token');

      if (userId && key) {
        this.authenticate(userId, key);
      } else {
        this.contentView.loadContent();
      }
    },

    render: function() {
      this.$el.html(this.navView.render().el);
      this.$el.append(this.contentView.render().el);
      return this;
    },
      
    contentLoaded: function() {
      this.trigger('content:loaded');
    },

    authenticate: function(userId, key) {
      var header = { headers: { 'X-Toke-Key': key }};
      var user = new User({ id: userId });
      this.listenTo(user, 'sync', this.authenticated);
      this.listenTo(user, 'error', this.notAuthenticated);
      user.fetch(header);
    },
      
    authenticated: function(model, response, options) {
      this.token = new Token(response.user.token);
      delete response.user.token;
      this.currentUser = new User(response.user);

      this.listenTo(this.token, 'destroy', this.signedOut);

      $.cookie('_jf_session_token', this.token.get('key'));
      $.cookie('_jf_session_userId', this.currentUser.get('id'));

      this.navView.userAuthenticated(this.currentUser.get('username'));
      this.contentView.setAuth({ currentUser: this.currentUser, token: this.token });

      this.contentView.loadContent();

      if (options.nextPage) {
        this.listenToOnce(this.contentView, 'content:loaded', function() {
          this.vent.trigger('show:' + options.nextPage);
        });
      }
    },

    notAuthenticated: function(response) {
      $.removeCookie('_jf_session_token');
      $.removeCookie('_jf_session_userId');
      this.contentView.loadContent();
    },

    signOut: function() {
      var header = { headers: {'X-Toke-Key': this.token.get('key') }};
      this.token.destroy(header);
    },

    signedOut: function() {
      $.removeCookie('_jf_session_token');
      $.removeCookie('_jf_session_userId');
      this.navView.userSignedOut();
      this.contentView.destroyAuth();
    }
  });

  return AppView;
});
