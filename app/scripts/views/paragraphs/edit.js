define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var EditParagraphView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_paragraph.ejs'],

    id: 'edit-paragraph',

    events: {
      'click #save_paragraph': 'save',
      'click #cancel_paragraph': 'cancel'
    },

    initialize: function(options) {
      this.user = options.user;
      this.listenTo(this.model, 'sync', function() {
        this.trigger('paragraph:saved');
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    save: function(e) {
      e.preventDefault();
      this.model.set(this.newAttributes());
      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.save({}, header);
      } else {
        console.log('Not Authorized');
      }
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('paragraph:edit:cancel');
    },

    newAttributes: function() {
      return {
        text: this.$('#edit_paragraph_text').val()
      };
    }
  });

  return EditParagraphView;
});
