define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/bullets'
], function ($, _, Backbone, JST, BulletsView) {
  'use strict';

  var SelectBulletsView = Backbone.View.extend({

    initialize: function(options) {
      this.auth = options.auth;
      this.selectedBullets = options.selectedBullets;
    },

    setSelectedBullets: function(selectedBullets) {
      this.selectedBullets = selectedBullets;
    },

    template: JST['app/scripts/templates/select_bullets.ejs'],

    events: {
      'click #new_bullet': 'newBullet'
    },

    render: function() {
      this.$el.html(this.template());
      this.bulletsView = new BulletsView({
        collection: this.collection,
        auth: this.auth,
        selected: this.selectedBullets
      });
      this.$el.append(this.bulletsView.render().el);
      return this;
    },

    newBullet: function(e) {
      e.preventDefault();
      this.trigger('show:new:bullet');
    }
  });

  return SelectBulletsView;
});
