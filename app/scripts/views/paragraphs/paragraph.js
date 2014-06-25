define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ParagraphView = Backbone.View.extend({
    tagName: 'p',

    render: function() {
      this.$el.html(this.model.get('text'));
      return this;
    }
  });

  return ParagraphView;
});

