define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var EditItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_item.ejs'],

    events: {
      'click #save_item': 'save',
      'click #cancel': 'cancel'
    },

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.model, 'sync', this.itemSynced);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    save: function(e) {
      e.preventDefault();
      this.model.set(this.newAttributes());
      var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
      this.model.save({}, header);
    },

    newAttributes: function() {
      return {
        name: this.$('#new_item_name').val(),
        title: this.$('#new_item_title').val(),
        heading: this.$('#new_item_heading').val()
      };
    },

    itemSynced: function(model, response, options) {
      this.trigger('item:updated');
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('item:edit:cancel');
    }
  });

  return EditItemView;
});
