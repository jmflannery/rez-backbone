define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectAddressView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_address.ejs'],

    id: 'select_address',

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return SelectAddressView;
});
