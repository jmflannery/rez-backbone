define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ProfileView = Backbone.View.extend({
    template: JST['app/scripts/templates/profile.ejs'],

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return ProfileView;
});
