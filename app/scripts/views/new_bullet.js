define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewBulletView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_bullet.ejs'],

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return NewBulletView;
});
