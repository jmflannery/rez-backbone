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

      this.listenTo(this.contentView, 'content:loaded', this.loadPage);

      this.render();

      var userId = $.cookie('_jf_session_userId');
      var key = $.cookie('_jf_session_token');

      if (userId && key) {
        this.authenticate(userId, key);
      }
    },

    render: function() {
      this.$el.html(this.navView.render().el);
      this.$el.append(this.contentView.render().el);
      return this;
    },

    authenticate: function(userId, key) {
      var header = { headers: { 'X-Toke-Key': key }};
      new User({ id: userId }).fetch(header).then(function(response) {
        this.authenticated({ response: response });
      }.bind(this));
    },

    authenticated: function(options) {
      this.token = new Token(options.response.user.token);
      delete options.response.user.token;
      this.currentUser = new User(options.response.user);

      $.cookie('_jf_session_token', this.token.get('key'));
      $.cookie('_jf_session_userId', this.currentUser.get('id'));

      this.navView.userAuthenticated(this.currentUser.get('username'));
      this.contentView.setAuth({ currentUser: this.currentUser, token: this.token });

      if (options.page) {
        this.currentPage = options.page;
        this.loadPage();
      }
    },

    signout: function() {
      var header = { headers: {'X-Toke-Key': this.token.get('key') }};
      this.token.destroy(header).done(function(response) {
        $.removeCookie('_jf_session_token');
        $.removeCookie('_jf_session_userId');
        this.navView.userSignedOut();
        this.contentView.destroyAuth();
      }.bind(this)).fail(function(response) {
        console.log(response);
      });
    },

    loadPage: function() {
      console.log('triggering page load: ' + this.currentPage);
      this.vent.trigger('show:' + this.currentPage);
    }

  });

  return AppView;
});
