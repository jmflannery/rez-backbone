define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/items'
], function ($, _, Backbone, JST, ItemsView) {
  'use strict';

  var SelectItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_items.ejs'],

    initialize: function(options) {
      this.resume = options.resume;
      this.auth = options.auth;
      this.vent = options.vent;
    },

    events: {
      'click .new_item': 'newItem'
    },

    render: function() {
      this.$el.html(this.template());
      this.itemsView = new ItemsView({
        resume: this.resume,
        auth: this.auth,
        vent: this.vent,
        collection: this.collection
      });
      this.listenTo(this.itemsView, 'edit:item', function(item) {
        this.trigger('edit:item:show', item)
      });
      this.$el.append(this.itemsView.render().el);
      return this;
    },

    getSelectedItemIds: function() {
      return this.itemsView.getSelectedItemIds();
    },

    newItem: function(e) {
      e.preventDefault();
      this.trigger('show:new:item');
    }
  });

  return SelectItemsView;
});
