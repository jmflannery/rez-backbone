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
      'click #save_item': 'saveItem',
      'click #cancel': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveItem: function(e) {
      e.preventDefault();
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('item:edit:cancel');
    }
  });

  return EditItemView;
});
