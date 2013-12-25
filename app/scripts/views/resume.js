define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/resume.ejs'],

    tagName: 'li',

    id: 'resume',

    events: {
      'click .destroy': 'destroy'
    },

    initialize: function(options) {
      this.auth = options.auth;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    destroy: function(e) {
      e.preventDefault();
      if (this.auth) {
        var header = { headers: {'X-Toke-Key': this.auth.token.get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized');
      }
    }
  });

  return ResumeView;
});
