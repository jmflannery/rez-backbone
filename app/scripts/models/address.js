define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var AddressModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/addresses',

    defaults: {
      building_number: '',
      street_name: '',
      secondary_address: '',
      city: '',
      state: '',
      zip_code: '',
      county: '',
      country: ''
    },

    parse: function(response) {
      if (response.address) {
        return response.address;
      } else {
        return response;
      }
    },

    toJSON: function() {
      return {
        address: this.attributes
      };
    }
  });

  return AddressModel;
});
