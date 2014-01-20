define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectBulletsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_bullets.ejs'],

    events: {
      'click #new_bullet': 'newBullet'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    newBullet: function(e) {
      e.preventDefault();
      this.trigger('show:new:bullet');
    }
  });

  return SelectBulletsView;
});
