define([
  'jquery',
  'underscore',
  'backbone',
  'views/nav'
], function ($, _, Backbone, NavView) {
  'use strict';

  var AppView = Backbone.View.extend({

    el: '#page',

    initialize: function(vent) {
      this.vent = vent;
    },

    render: function() {
      this.$el.html(new NavView(this.vent).render().el);
      return this;
    }
  });

  return AppView;
});
