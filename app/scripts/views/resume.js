define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/resume',
], function ($, _, Backbone, JST, Resume) {
  'use strict';

  var ResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/resume.ejs'],

    id: 'resume',

    initialize: function(options) {
      this.vent = options.vent;
      this.auth = options.auth;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return ResumeView;
});
