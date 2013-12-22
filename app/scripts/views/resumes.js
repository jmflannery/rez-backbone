define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ResumesView = Backbone.View.extend({
    template: JST['app/scripts/templates/resumes.ejs'],

    tagName: 'section',

    id: 'resumes',

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return ResumesView;
});
