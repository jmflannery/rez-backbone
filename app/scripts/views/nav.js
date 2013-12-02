define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NavView = Backbone.View.extend({
    template: JST['app/scripts/templates/nav.ejs'],

    tagName: 'nav',

    initialize: function(vent) {
      this.vent = vent;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return NavView;
});
