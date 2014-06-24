define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/paragraphs/select_paragraph',
], function ($, _, Backbone, JST, ParagraphView) {
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
      this.selectedParagraphs = options.selectedParagraphs;
    },

    render: function() {
      this.$el.html(this.template());
      this.paragraphViews = [];

      this.collection.each(function(paragraph) {
        var selected = $.inArray(paragraph.id, this.selectedParagraphs) > -1;
        var view = new ParagraphView({
          model: paragraph,
          selected: selected
        });

        this.listenToOnce(view, 'paragraph:edit', function(paragraphId) {
          this.trigger('paragraph:edit:show', paragraphId);
        });

        this.$el.append(view.render().el);

        this.paragraphViews.push(view);
      }, this);

      return this;
    },

    getSelectedParagraphIds: function() {
      var paragraph_ids = [];
      _.each(this.paragraphViews, function(paragraphView) {
        if (paragraphView.isSelected()) {
          paragraph_ids.push(paragraphView.paragraphId());
        }
      });
      return paragraph_ids;
    },

    newParagraph: function(e) {
      e.preventDefault();
      this.trigger('paragraph:new');
    }
  });

  return SelectParagraphsView;
});
