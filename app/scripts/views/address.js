define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var AddressView = Backbone.View.extend({
    template: JST['app/scripts/templates/address.ejs'],
    tagName: 'section',
    id: 'address',

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return AddressView;
});
