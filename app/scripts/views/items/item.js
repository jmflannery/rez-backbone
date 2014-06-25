define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/bullets/index',
  'views/paragraphs/paragraphs'
], function ($, _, Backbone, JST, BulletsView, ParagraphsView) {
  'use strict';

  var ItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/show_item.ejs'],

    render: function() {
      this.$el.html(this.template());

      var bulletsView = new BulletsView({
        collection: this.model.get('bullets')
      });
      this.$el.append(bulletsView.render().el);

      var paragraphsView = new ParagraphsView({
        collection: this.model.get('paragraphs')
      });
      this.$el.append(paragraphsView.render().el);

      return this;
    }
  });

  return ItemView;
});
