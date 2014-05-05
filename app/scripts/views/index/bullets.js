define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/index/bullet'
], function ($, _, Backbone, JST, BulletView) {
  'use strict';

  var BulletsView = Backbone.View.extend({

    initialize: function(options) {
      this.selected = options.selected;
    },

    tagName: 'ul',

    id: 'bullets',

    render: function() {
      this.$el.empty();
      this.collection.each(function(bullet) {
        var selected = $.inArray(bullet.id, this.selected) > -1;
        var bv = new BulletView({ model: bullet, selected: selected });
        this.$el.append(bv.render().el);
      }, this);
      return this;
    }
  });

  return BulletsView;
});
