define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectParagraphView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_paragraph.ejs'],

    tagName: 'li',

    events: {
      'click #edit_paragraph': 'editParagraph'
    },

    initialize: function(options) {
      this.selected = options.selected;
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
    }
  });

  return SelectParagraphView;
});
