define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectParagraphsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_paragraphs.ejs'],

    tagName: 'section',

    id: 'select-paragraphs',

    events: {
      'click #new_paragraph': 'newParagraph'
    },

    initialize: function(options) {
      this.auth = options.auth;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    newParagraph: function(e) {
      e.preventDefault();
      this.trigger('paragraph:new');
    }
  });

  return SelectParagraphsView;
});
