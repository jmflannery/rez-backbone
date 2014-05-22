define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectParagraphsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_paragraphs.ejs'],

    initialize: function(options) {
      this.auth = options.auth;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return SelectParagraphsView;
});
