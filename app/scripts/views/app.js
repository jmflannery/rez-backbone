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

    initialize: function(vent, currentPage) {
      this.vent = vent;
      this.currentPage = currentPage;

      this.vent.on('session:authenticated', this.authenticated.bind(this));
      this.vent.on('session:destroy', this.signout.bind(this));

      this.navView = new NavView(this.vent);
      this.contentView = new ContentView(this.vent, currentPage);

      this.listenTo(this.contentView, 'content:loaded', this.showPage);

      var userId = $.cookie('_jf_session_userId');
      var key = $.cookie('_jf_session_token');

      this.render();

      if (userId && key) {
        this.authenticate(userId, key);
      } else {
        this.contentView.fetchResumes();
      }
    },

    render: function() {
      this.$el.html(this.navView.render().el);
      this.$el.append(this.contentView.render().el);
      return this;
    },
      
    showPage: function() {
      this.vent.trigger('show:' + this.currentPage);
    },

    authenticate: function(userId, key) {
      var header = { headers: { 'X-Toke-Key': key }};
      var user = new User({ id: userId });
      this.listenTo(user, 'sync', this.authenticated);
      this.listenTo(user, 'error', this.notAuthenticated);
      user.fetch(header);
    },
      
    authenticated: function(model, response, xhr, page) {
      this.token = new Token(response.user.token);
      delete response.user.token;
      this.currentUser = new User(response.user);

      this.listenTo(this.token, 'destroy', this.signedOut);

      $.cookie('_jf_session_token', this.token.get('key'));
      $.cookie('_jf_session_userId', this.currentUser.get('id'));

      this.navView.userAuthenticated(this.currentUser.get('username'));
      this.contentView.setAuth({ currentUser: this.currentUser, token: this.token });

      if (page) {
        this.currentPage = page;
      }

      this.contentView.fetchResumes();
    },

    notAuthenticated: function(response) {
      console.log(response);
      $.removeCookie('_jf_session_token');
      $.removeCookie('_jf_session_userId');
      this.contentView.fetchResumes();
    },

    signout: function() {
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
