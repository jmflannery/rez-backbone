define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ParagraphsNewView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_paragraph.ejs'],

    events: {
      'click #save_paragraph': 'saveParagraph',
      'click #cancel': 'cancel'
    },

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.collection, 'sync', this.paragraphSynced);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveParagraph: function(e) {
      e.preventDefault();
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
        this.collection.create(this.newAttributes(), header);
      } else {
        console.log('Aint Authed');
      }
    },

    newAttributes: function() {
      return {
        text: this.$('#new_paragraph_text').val()
      };
    },

    paragraphSynced: function(model, response, options) {
      this.trigger('paragraph:new:saved', model);
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('paragraph:new:cancel');
    }
  });

  return ParagraphsNewView;
});
