// This view represents a list of bullets on a resume.

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/show/bullet'
], function ($, _, Backbone, JST, BulletView) {
  'use strict';

  var DetailedBulletsView = Backbone.View.extend({
    tagName: 'ul',

    id: 'bullets',

    render: function() {
      this.$el.empty();
      if (this.collection) {
        this.collection.forEach(function(bullet) {
          var div = new BulletView({ model: bullet });
          this.$el.append(div.render().el);
        }, this);
      }
      return this;
    }
  });

  return DetailedBulletsView;
});