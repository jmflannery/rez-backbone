define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SessionView = Backbone.View.extend({
    template: JST['app/scripts/templates/session.ejs'],

    tagName: 'signin',

    events: {
      'submit': 'signin'
    },

    signin: function(e) {
      e.preventDefault();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return SessionView;
});
