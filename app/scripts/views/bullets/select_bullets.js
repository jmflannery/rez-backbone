define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/bullets/select_bullet'
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
      this.resume = options.resume;
      this.section = options.section;
      this.item = options.item;
      this.user = options.user;
      this.selectedBullets = options.selectedBullets;
      this.listenTo(this.collection, 'remove', this.render);
    },

    render: function() {
      this.$el.html(this.template());
      this.bulletViews = [];

      this.collection.each(function(bullet) {
        var selected = $.inArray(bullet.id, this.selectedBullets) > -1;
        var view = new BulletView({
          model: bullet,
          section: this.section,
          item: this.item,
          selected: selected,
          user: this.user
        });

        this.listenToOnce(view, 'bullet:edit', function(bulletId) {
          this.trigger('bullet:edit:show', bulletId);
        });

        this.$('tbody').append(view.render().el);

        this.bulletViews.push(view);
      }, this);

      return this;
    },

    setSelectedBullets: function(selectedBullets) {
      this.selectedBullets = selectedBullets;
    },

    getSelectedBulletIds: function() {
      var bullet_ids = [];
      _.each(this.bulletViews, function(bulletView) {
        if (bulletView.isSelected()) {
          bullet_ids.push(bulletView.bulletId());
        }
      });
      return bullet_ids;
    },

    newBullet: function(e) {
      e.preventDefault();
      this.trigger('show:new:bullet');
    }
  });

  return SelectBulletsView;
});
