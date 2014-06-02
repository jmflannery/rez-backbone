define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/bullets/bullet'
], function ($, _, Backbone, JST, BulletView) {
  'use strict';

  var SelectBulletsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_bullets.ejs'],

    tagName: 'section',

    id: 'select-bullets',

    events: {
      'click #new_bullet': 'newBullet'
    },

    initialize: function(options) {
      this.auth = options.auth;
      this.selectedBullets = options.selectedBullets;
    },

    render: function() {
      this.$el.html(this.template());
      this.collection.each(function(bullet) {
        var selected = $.inArray(bullet.id, this.selectedBullets) > -1;
        var view = new BulletView({
          model: bullet,
          selected: selected
        });

        this.listenToOnce(view, 'bullet:edit', function(bulletId) {
          this.trigger('bullet:edit:show', bulletId);
        });

        this.$el.append(view.render().el);
      }, this);

      return this;
    },

    setSelectedBullets: function(selectedBullets) {
      this.selectedBullets = selectedBullets;
    },

    newBullet: function(e) {
      e.preventDefault();
      this.trigger('show:new:bullet');
    }
  });

  return SelectBulletsView;
});
