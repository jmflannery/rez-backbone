define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewAddressView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_address.ejs'],

    id: 'new_address',

    initialize: function(options) {
      this.resume = options.resume;
      this.auth = options.auth;
      this.listenTo(this.collection, 'sync', this.addressSynced);
    },

    events: {
      'click #save_address': 'saveAddress',
      'click #cancel': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveAddress: function(e) {
      e.preventDefault();
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
        this.collection.create(this.newAttributes(), header);
      } else {
        console.log('Aint Authed');
      }
    },

    newAttributes: function() {
      return {
        building_number: this.$('#new_address_building_number').val(),
        street_name: this.$('#new_address_street_name').val(),
        secondary_address: this.$('#new_address_secondary_address').val(),
        city: this.$('#new_address_city').val(),
        state: this.$('#new_address_state').val(),
        zip_code: this.$('#new_address_zip_code').val(),
        county: this.$('#new_address_county').val(),
        country: this.$('#new_address_country').val(),
        area_code: this.$('#new_address_area_code').val(),
        phone_number: this.$('#new_address_phone_number').val()
      };
    },

    addressSynced: function(model, response, options) {
      this.trigger('address:new:saved', model);
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('address:new:cancel');
    }
  });

  return NewAddressView;
});
