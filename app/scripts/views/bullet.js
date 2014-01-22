define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var BulletView = Backbone.View.extend({
    template: JST['app/scripts/templates/bullet.ejs'],

    tagName: 'li',

    initialize: function(options) {
      this.selected = options.selected;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return BulletView;
});
