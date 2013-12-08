define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/session',
  'jquery.cookie'
], function ($, _, Backbone, JST, Session) {
  'use strict';

  var SessionView = Backbone.View.extend({
    template: JST['app/scripts/templates/session.ejs'],

    tagName: 'signin',

    initialize: function(vent) {
      this.vent = vent;
    },

    events: {
      'submit': 'signin'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    signin: function(e) {
      e.preventDefault();
      var username = this.$('input#username').val();
      var password = this.$('input#password').val();
      this.model = new Session({ username: username, password: password });
      this.model.on('session:authenticated', this.authenticated, this);
      this.model.authenticate();
    },

    authenticated: function() {
      this.user = this.model.user;
      this.token = this.model.token;
      $.cookie('_jf_session_token', this.token.get('key'));
      this.vent.trigger('session:authenticated', this.user, this.token);
    }
  });

  return SessionView;
});
