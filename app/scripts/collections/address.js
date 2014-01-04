define([
  'underscore',
  'backbone',
  'models/address'
], function (_, Backbone, Address) {
  'use strict';

  var AddressCollection = Backbone.Collection.extend({
    model: Address,

    url: 'http://localhost:3000/rez/addresses',

    parse: function(response) {
      return response.addresses;
    }
  });

  return AddressCollection;
});
