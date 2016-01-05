define([
  'underscore',
  'backbone',
  'models/address',
  'config',
], function (_, Backbone, Address, config) {
  'use strict';

  var AddressCollection = Backbone.Collection.extend({
    model: Address,

    url: config.domain + '/rez/addresses',

    initialize: function() {
      this.fetched = false;
      this.listenTo(this, 'reset', function() { this.fetched = true });
    },

    parse: function(response) {
      return response.addresses;
    }
  });

  return AddressCollection;
});
