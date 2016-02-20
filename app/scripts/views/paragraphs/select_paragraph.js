define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectParagraphView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_paragraph.ejs'],

    tagName: 'tr',

    id: function() {
      return 'bullet_' + this.model.id;
    },

    events: {
      'click #edit_paragraph': 'edit',
      'click #delete_paragraph': 'destroy'
    },

    initialize: function(options) {
      this.selected = options.selected;
      this.user = options.user;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    isSelected: function() {
      return this.$('input[type=checkbox]').is(':checked');
    },

    paragraphId: function() {
      return this.model.id;
    },

    edit: function(e) {
      e.preventDefault();
      this.trigger('paragraph:edit', this.model.id);
    },

    destroy: function(e) {
      e.preventDefault();
      if (this.user) {
        var header = { headers: {'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized');
      }
    }
  });

  return SelectParagraphView;
});
