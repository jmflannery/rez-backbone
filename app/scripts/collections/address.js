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

    parse: function(response) {
      return response.addresses;
    }
  });

  return AddressCollection;
});
