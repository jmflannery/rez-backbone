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

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.model, 'sync', this.resumeSaved)
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    doneEditing: function(e) {
      e.preventDefault();
      var newName = this.$('input#resume_name').val();
      this.model.set('name', newName);
      var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
      this.model.save({}, header);
    },

    resumeSaved: function() {
      this.trigger('show:resume', this.model.id);
    }
  });

  return EditResumeView;
});
