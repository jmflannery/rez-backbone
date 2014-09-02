define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/items/items'
], function ($, _, Backbone, JST, ItemsView) {
  'use strict';

  var SectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/section.ejs'],

    className: 'section',

    initialize: function(options) {
      this.itemsView = new ItemsView({
        collection: this.model.get('items')
      });
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.append(this.itemsView.render().el);
      return this;
    }
  });

  return SectionView;
});
