define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectBulletsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_bullets.ejs'],

    render: function() {
      console.log(this.el);
      this.$el.html(this.template());
      return this;
    }
  });

  return SelectBulletsView;
});
