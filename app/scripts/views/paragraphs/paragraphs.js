define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/paragraphs/paragraph'
], function ($, _, Backbone, JST, ParagraphView) {
  'use strict';

  var ParagraphsView = Backbone.View.extend({
    className: 'paragraphs',

    render: function() {
      this.$el.empty();
      if (this.collection) {
        this.collection.forEach(function(paragraph) {
          var div = new ParagraphView({ model: paragraph });
          this.$el.append(div.render().el);
        }, this);
      }
      return this;
    }
  });

  return ParagraphsView;
});

