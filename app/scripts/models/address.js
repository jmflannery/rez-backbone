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
      country: '',
      area_code: '',
      phone_number: ''
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
    },

    lineOne: function() {
      return this.get('building_number') + ' ' + this.get('street_name');
    },
  
    lineTwo: function() {
      return this.get('city') + ', ' + this.get('state') + ' ' + this.get('zip_code');
    },

    lineThree: function() {
      return this.get('area_code') + '.' + this.get('phone_number');
    }
  });

  return AddressModel;
});
