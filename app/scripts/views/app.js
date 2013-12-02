define([
  'jquery',
  'underscore',
  'backbone',
], function ($, _, Backbone) {
  'use strict';

  var AppView = Backbone.View.extend({

    initialize: function(vent) {
      this.vent = vent;
    },

    render: function() {
      return this;
    }
  });

  return AppView;
});
