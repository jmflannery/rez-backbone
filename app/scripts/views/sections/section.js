define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/section.ejs'],

    className: 'section',

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return SectionView;
});
