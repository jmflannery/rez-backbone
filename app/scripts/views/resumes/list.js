define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/resumes/list_item'
], function ($, _, Backbone, JST, ResumeListItemView) {
  'use strict';

  var ResumeListView = Backbone.View.extend({
    tagName: 'ul',

    className: 'resumes',

    initialize: function(options) {
      this.auth = options.auth;
      this.vent = options.vent;
      this.listenTo(this.collection, 'remove', this.render);
    },

    render: function() {
      this.$el.empty();
      this.collection.each(function(resume) {
        this.$el.append(new ResumeListItemView({
          model: resume,
          auth: this.auth,
          vent: this.vent
        }).render().el);
      }, this);

      return this;
    }
  });

  return ResumeListView;
});
