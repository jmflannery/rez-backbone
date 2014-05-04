define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/detailed_bullets'
], function ($, _, Backbone, JST, DetailedBulletsView) {
  'use strict';

  var DetailedItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/detailed_item.ejs'],

    render: function() {
      this.$el.html(this.template());
      var bulletsView = new DetailedBulletsView({
        collection: this.model.get('bullets')
      });
      this.$el.append(bulletsView.render().el);

      return this;
    }
  });

  return DetailedItemView;
});
