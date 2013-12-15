define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/resume.ejs'],

    id: 'resume',

    initialize: function(vent) {
      this.vent = vent;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return ResumeView;
});
