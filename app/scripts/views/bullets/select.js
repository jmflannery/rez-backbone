define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/index/bullets'
], function ($, _, Backbone, JST, BulletsView) {
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
      this.bulletsView = new BulletsView({
        collection: this.collection,
        auth: this.auth,
        selected: this.selectedBullets
      });
      this.listenTo(this.bulletsView, 'bullet:edit', function(bulletId) {
        this.trigger('bullet:edit:show', bulletId);
      });
      this.$el.append(this.bulletsView.render().el);

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
