define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectBulletView = Backbone.View.extend({
    template: JST['app/scripts/templates/bullet.ejs'],

    tagName: 'li',

    events: {
      'click #edit_bullet': 'editBullet'
    },

    initialize: function(options) {
      this.selected = options.selected;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    editBullet: function(e) {
      e.preventDefault();
      this.trigger('bullet:edit', this.model.id);
    }
  });

  return SelectBulletView;
});
