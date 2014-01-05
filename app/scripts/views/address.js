define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var AddressView = Backbone.View.extend({
    template: JST['app/scripts/templates/address.ejs'],

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return AddressView;
});
