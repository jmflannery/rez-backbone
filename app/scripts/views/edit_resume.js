define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/new_profile'
], function ($, _, Backbone, JST, NewProfileView) {
  'use strict';

  var EditResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_resume.ejs'],

    tagName: 'section',

    id: function() {
      return 'edit_resume_' + this.model.id;
    },

    events: {
      'click .done_editing': 'doneEditing',
      'click .new_profile': 'newProfile'
    },

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.model, 'sync', this.resumeSaved);
      this.listenTo(this.model, 'error', this.resumeSaveError);
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
    },

    resumeSaveError: function(model, xhr, options) {
      var errors = this.formatErrors(xhr.responseText);
      var errorsEl = this.$('#errors').empty();
      _.each(errors, function(element, index, list) {
        var er = $('<p>').text(element);
        errorsEl.append(er);
      }, this);
    },

    newProfile: function(e) {
      e.preventDefault();
      this.$('#profile').html(new NewProfileView().render().el);
    },

    formatErrors: function(errorText) {
      var error = JSON.parse(errorText);
      var errors = [];
      _.each(error, function(value, key, obj) {
        _.each(value, function(element, index, list) {
          var e = this.capitaliseFirst(key) + ' ' + element + '.';
          errors.push(e);
        }, this);
      }, this);
      return errors;
    },

    capitaliseFirst: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  });

  return EditResumeView;
});
