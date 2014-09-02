// This view represents a div containing a list of Items to be selected
// and a link to create a new Item.

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/items/select_item'
], function ($, _, Backbone, JST, ItemView) {
  'use strict';

  var SelectItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_items.ejs'],

    id: 'select_items',

    events: {
      'click .new_item': 'newItem'
    },

    initialize: function(options) {
      this.section = options.section;
      this.auth = options.auth;
      this.vent = options.vent;
      this.listenTo(this.collection, 'remove', this.render);
    },

    render: function() {
      this.$el.html(this.template());
      var $tbody = this.$('tbody');
      this.itemViews = [];

      this.collection.each(function(item) {
        var itemView = new ItemView({
          model: item,
          section: this.section,
          auth: this.auth,
          vent: this.vent
        });

        this.listenToOnce(itemView, 'item:edit', function(itemId, resumeId) {
          this.trigger('item:edit:show', itemId, resumeId);
        });

        this.itemViews.push(itemView);

        $tbody.append(itemView.render().el);
      }, this);

      this.setItemsSelected();

      return this;
    },

    setItemsSelected: function() {
      _.each(this.section.itemIds(), function(itemId) {
        this.$('tr#item_' + itemId + ' input[type=checkbox]').prop('checked', true);
      }, this);
    },

    getSelectedItemIds: function() {
      var item_ids = [];
      _.each(this.itemViews, function(itemView) {
        if (itemView.isSelected()) {
          item_ids.push(itemView.itemId());
        }
      });
      return item_ids;
    },

    newItem: function(e) {
      e.preventDefault();
      this.trigger('item:new:show');
    }
  });

  return SelectItemsView;
});
