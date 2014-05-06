define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/index/item'
], function ($, _, Backbone, JST, ItemView) {
  'use strict';

  var ItemsView = Backbone.View.extend({
    template: JST['app/scripts/templates/items.ejs'],

    tagName: 'table',

    id: 'items',

    initialize: function(options) {
      this.resume = options.resume;
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
          resume: this.resume,
          auth: this.auth,
          vent: this.vent
        });

        this.listenToOnce(itemView, 'item:edit', function(item) {
          this.trigger('edit:item', item);
        });

        this.itemViews.push(itemView);
        $tbody.append(itemView.render().el);
      }, this);

      this.setItemsSelected();
      return this;
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

    setItemsSelected: function() {
      this.resume.get('items').each(function(item) {
        this.$('tr#item_' + item.id + ' input[type=checkbox]').prop('checked', true);
      }, this);
    }
  });

  return ItemsView;
});
