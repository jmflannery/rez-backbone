define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/bullets/bullets'
], function ($, _, Backbone, JST, BulletsView) {
  'use strict';

  var DetailedItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/show_item.ejs'],

    render: function() {
      this.$el.html(this.template());
      var bulletsView = new BulletsView({
        collection: this.model.get('bullets')
      });
      this.$el.append(bulletsView.render().el);

      return this;
    }
  });

  return DetailedItemView;
});
