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

    events: {
      'click #new_address': 'newAddress'
    },

    render: function() {
      this.$el.html(this.template());
      this.loadAddressDropDown();
      return this;
    },

    loadAddressDropDown: function() {
      var dropDown = this.$('select#resume_address');
      dropDown.append($('<option>').val(0).text(''));
      this.collection.each(function(address) {
        dropDown.append($('<option>').val(address.id).text(address.get('street_name')));
      });
    },

    getSelectedAddressId: function() {
      return this.$('select#resume_address').val();
    },

    setSelectedAddress: function(addressId) {
      this.dropDown = this.$('select#resume_address');
      this.dropDown.val(addressId);
    },

    newAddress: function(e) {
      e.preventDefault();
      this.trigger('show:new:address');
    }
  });

  return SelectAddressView;
});
