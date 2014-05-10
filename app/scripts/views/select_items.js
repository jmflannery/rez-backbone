// This view represents a div containing a list of Items to be selected
// and a link to create a new Item.

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/index/items'
], function ($, _, Backbone, JST, ItemsView) {
  'use strict';

  var SelectItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_items.ejs'],

    id: 'select_items',

    events: {
      'click .new_item': 'newItem'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.auth = options.auth;
      this.vent = options.vent;
    },

    render: function() {
      this.$el.html(this.template());
      this.itemsView = new ItemsView({
        resume: this.resume,
        auth: this.auth,
        vent: this.vent,
        collection: this.collection
      });
      this.listenTo(this.itemsView, 'item:edit', function(itemId, resumeId) {
        this.trigger('item:edit:show', itemId, resumeId);
      });
      this.$el.append(this.itemsView.render().el);
      return this;
    },

    getSelectedItemIds: function() {
      return this.itemsView.getSelectedItemIds();
    },

    newItem: function(e) {
      e.preventDefault();
      this.trigger('item:new:show');
    }
  });

  return SelectItemsView;
});
