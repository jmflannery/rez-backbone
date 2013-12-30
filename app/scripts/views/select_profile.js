define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectProfileView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_profile.ejs'],

    id: 'select_profile',

    events: {
      'click #new_profile': 'newProfile'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    newProfile: function(e) {
      e.preventDefault();
      this.trigger('show:new:profile');
    }
  });

  return SelectProfileView;
});
