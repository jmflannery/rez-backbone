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
      'click .show_resume': 'show',
      'click .destroy_resume': 'destroy'
    },

    initialize: function(options) {
      this.user = options.user;
      this.vent = options.vent;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    show: function(e) {
      e.preventDefault();
      Backbone.history.navigate('resumes/' + this.model.id, true);
    },

    destroy: function(e) {
      e.preventDefault();
      if (this.user) {
        var header = { headers: {'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized');
      }
    }
  });

  return ResumeView;
});
