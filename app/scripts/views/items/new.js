define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_item.ejs'],

    tagName: 'section',

    id: 'new_item',

    initialize: function(options) {
      this.user = options.user;
      this.listenTo(this.collection, 'sync', this.itemSynced);
    },

    events: {
      'click #save_item': 'saveItem',
      'click #cancel_item': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveItem: function(e) {
      e.preventDefault();
      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.collection.create(this.newAttributes(), header);
      } else {
        console.log('Aint Authed');
      }
    },

    itemSynced: function(model, response, options) {
      this.trigger('item:new:saved', model);
    },

    newAttributes: function() {
      return {
        name: this.$('#new_item_name').val(),
        title: this.$('#new_item_title').val(),
        heading: this.$('#new_item_heading').val()
      };
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('item:new:cancel');
    }
  });

  return NewItemView;
});
