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
        this.vent.trigger('session:authenticated', response, "home");
      }.bind(this)).fail(function(response) {
        console.log(response);
      });
    }
  });

  return SessionView;
});
