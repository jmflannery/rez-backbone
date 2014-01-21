define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/bullet'
], function ($, _, Backbone, JST, BulletView) {
  'use strict';

  var BulletsView = Backbone.View.extend({

    initialize: function() {
      console.log(this.collection);
    },

    tagName: 'ul',

    id: 'bullets',

    render: function() {
      this.$el.empty();
      this.collection.each(function(bullet) {
        var bv = new BulletView({ model: bullet });
        this.$el.append(bv.render().el);
      }, this);
      return this;
    }
  });

  return BulletsView;
});
