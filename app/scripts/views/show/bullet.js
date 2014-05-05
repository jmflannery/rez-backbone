// This view represents one Bullet on a Resume

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var DetailedBulletView = Backbone.View.extend({
    tagName: 'li',

    render: function() {
      this.$el.html(this.model.get('text'));
      return this;
    }
  });

  return DetailedBulletView;
});
