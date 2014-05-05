define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/index/resume'
], function ($, _, Backbone, JST, ResumeView) {
  'use strict';

  var ResumesView = Backbone.View.extend({
    tagName: 'ul',

    id: 'resumes',

    initialize: function(options) {
      this.auth = options.auth;
      this.vent = options.vent;
      this.listenTo(this.collection, 'remove', this.render);
    },

    render: function() {
      this.$el.empty();
      this.collection.each(function(resume) {
        this.$el.append(new ResumeView({
          model: resume,
          auth: this.auth,
          vent: this.vent
        }).render().el);
      }, this);

      return this;
    }
  });

  return ResumesView;
});
