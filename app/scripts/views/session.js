define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/session'
], function ($, _, Backbone, JST, Session) {
  'use strict';

  var SessionView = Backbone.View.extend({
    template: JST['app/scripts/templates/session.ejs'],

    tagName: 'signin',

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
      this.model.authenticate();
    }
  });

  return SessionView;
});
