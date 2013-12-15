define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/token',
  'models/user',
  'jquery.cookie'
], function ($, _, Backbone, JST, Token, User) {
  'use strict';

  var SessionView = Backbone.View.extend({
    template: JST['app/scripts/templates/session.ejs'],

    id: 'signin',

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
      var un = this.$('input#username').val();
      var pw = this.$('input#password').val();
      new Token({ username: un, password: pw }).save().done(function(response) {
        this.model = new Token(response.user.token);
        delete response.user.token;
        this.user = new User(response.user);
        $.cookie('_jf_session_token', this.model.get('key'));
        $.cookie('_jf_session_user_id', this.user.get('id'));
        this.vent.trigger('session:authenticated', this.user, this.model);
      }.bind(this)).fail(function(response) {
        console.log(response);
      });
    }
  });

  return SessionView;
});
