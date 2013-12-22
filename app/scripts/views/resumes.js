define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/resume'
], function ($, _, Backbone, JST, ResumeView) {
  'use strict';

  var ResumesView = Backbone.View.extend({
    tagName: 'ul',

    id: 'resumes',

    render: function() {
      this.collection.each(function(resume) {
        this.$el.append(new ResumeView({ model: resume }).render().el);
      }, this);

      return this;
    }
  });

  return ResumesView;
});
