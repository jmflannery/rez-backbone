define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var EditResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_resume.ejs'],

    tagName: 'section',

    id: function() {
      return 'edit_resume_' + this.model.id;
    },

    events: {
      'click .done_editing': 'doneEditing'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    doneEditing: function(e) {
      e.preventDefault();
      this.trigger('show:resume', this.model.id);
    }
  });

  return EditResumeView;
});
