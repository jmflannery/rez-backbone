define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/sections/section'
], function ($, _, Backbone, JST, SectionView) {
  'use strict';

  var SectionsView = Backbone.View.extend({
    tagName: 'section',

    className: 'sections',

    render: function() {
      this.$el.empty();
      if (this.collection) {
        this.collection.forEach(function(section) {
          var div = new SectionView({ model: section });
          this.$el.append(div.render().el);
        }, this);
      }
      return this;
    }
  });

  return SectionsView;
});
