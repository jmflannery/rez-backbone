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
      var token = new Token({ username: un, password: pw });
      this.listenTo(token, 'sync', this.signinSuccess);
      this.listenTo(token, 'error', this.signinFailure);
      token.save();
    },

    signinSuccess: function(model, response, xhr) {
      this.vent.trigger('session:authenticated', model, response, xhr, 'home');
    },

    signinFailure: function(model, response, xhr) {
      console.log('Signin Failure');
    }
  });

  return SessionView;
});
