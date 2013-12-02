define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var ContentView = Backbone.View.extend({

    id: 'content',

    initialize: function(vent) {
      this.vent = vent;
    },

    render: function() {
      this.$el.html("Jack Flannery.me");
      return this;
    }
  });

  return ContentView;
});
