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
        var view = new BulletView({
          model: bullet,
          selected: selected
        });

        this.listenToOnce(view, 'bullet:edit', function(bulletId) {
          this.trigger('bullet:edit', bulletId);
        });

        this.$el.append(view.render().el);
      }, this);
      return this;
    }
  });

  return BulletsView;
});
