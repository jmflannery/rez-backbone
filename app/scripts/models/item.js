define([
  'underscore',
  'backbone',
  'jquery',
  'collections/bullet'
], function (_, Backbone, $, BulletCollection) {
  'use strict';

  var ItemModel = Backbone.Model.extend({
    defaults: {
      name: '',
      title: '',
      heading: ''
    },

    initialize: function() {
      this.bullets = new BulletCollection({ parent: this });
    },

    load: function() {
      $.when(
        this.bullets.fetch()
      ).then(function() {
        this.trigger('item:loaded');
      }.bind(this));
    },

    parse: function(response) {
      if (response.item) {
        return response.item;
      } else {
        return response;
      }
    },

    toJSON: function() {
      return {
        item: this.attributes
      };
    }
  });

  return ItemModel;
});
