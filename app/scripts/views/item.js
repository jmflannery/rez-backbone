define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/item.ejs'],

    tagName: 'tr',

    id: function() {
      return 'item_' + this.model.id;
    },

    events: {
      'click #edit_item': 'edit',
      'click #delete_item': 'destroy'
    },

    initialize: function(options) {
      this.auth = options.auth;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    edit: function(e) {
      e.preventDefault();
      this.trigger('item:edit', this.model);
    },

    destroy: function(e) {
      e.preventDefault();
      if (this.auth) {
        var header = { headers: {'X-Toke-Key': this.auth.token.get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized');
      }
    },

    isSelected: function() {
      return this.$('input[type=checkbox]').is(':checked');
    },

    itemId: function() {
      return this.model.id;
    }
  });

  return ItemView;
});
