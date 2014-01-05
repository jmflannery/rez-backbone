define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/select_profile',
  'views/select_address',
  'views/new_profile',
  'views/new_address',
  'collections/profile',
  'collections/address'
], function ($, _, Backbone, JST, SelectProfileView, SelectAddressView, NewProfileView, NewAddressView, ProfileCollection, AddressCollection) {
  'use strict';

  var EditResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_resume.ejs'],

    tagName: 'section',

    id: function() {
      return 'edit_resume_' + this.model.id;
    },

    events: {
      'click .done_editing': 'doneEditing'
    },

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.model, 'sync', this.resumeSaved);
      this.listenTo(this.model, 'error', this.resumeSaveError);

      this.profiles = new ProfileCollection();
      this.addresses = new AddressCollection();

      $.when(
        this.profiles.fetch(),
        this.addresses.fetch()
      ).then(this.resumeLoaded.bind(this));
    },

    resumeLoaded: function() {
      this.initSelectProfileView();
      this.initSelectAddressView();
      this.trigger('resume:edit:ready');
    },

    render: function() {
      this.$el.html(this.template());
      this.renderSelectProfileView();
      this.renderSelectAddressView();
      return this;
    },

    initSelectProfileView: function() {
      this.selectProfileView = new SelectProfileView({
        collection: this.profiles
      });
      this.listenTo(this.selectProfileView, 'show:new:profile', this.showNewProfile);
    },

    initSelectAddressView: function() {
      this.selectAddressView = new SelectAddressView({
        collection: this.addresses
      });
      this.listenTo(this.selectAddressView, 'show:new:address', this.showNewAddress);
    },

    setSelectedProfileId: function(profileId) {
      this.selectProfileView.setSelectedProfile(profileId);
    },

    setSelectedAddressId: function(addressId) {
      this.selectAddressView.setSelectedAddress(addressId);
    },

    getSelectedProfileId: function() {
      return this.selectProfileView.getSelectedProfileId();
    },

    getSelectedAddressId: function() {
      return this.selectAddressView.getSelectedAddressId();
    },

    renderSelectProfileView: function() {
      this.$('#profile').html(this.selectProfileView.render().el);
      if (this.model.get('profile_id')) {
        this.setSelectedProfileId(this.model.get('profile_id'));
      }
    },

    renderSelectAddressView: function() {
      this.$('#address').html(this.selectAddressView.render().el);
      if (this.model.get('address_id')) {
        this.setSelectedAddressId(this.model.get('address_id'));
      }
    },

    showNewProfile: function() {
      var newProfileView = new NewProfileView({
        resume: this.model,
        collection: this.profiles,
        auth: this.auth
      });
      this.listenTo(newProfileView, 'profile:new:saved', this.newProfileSaved);
      this.listenTo(newProfileView, 'profile:new:cancel', this.cancelNewProfile);
      this.$('#profile').html(newProfileView.render().el);
    },

    showNewAddress: function() {
      var newAddressView = new NewAddressView({
        resume: this.model,
        collection: this.addresses,
        auth: this.auth
      });
      this.listenTo(newAddressView, 'address:new:saved', this.newAddressSaved);
      this.listenTo(newAddressView, 'address:new:cancel', this.cancelNewAddress);
      this.$('#address').html(newAddressView.render().el);
    },

    doneEditing: function(e) {
      e.preventDefault();
      // name
      var newName = this.$('input#resume_name').val();
      this.model.set('name', newName);
      // profile
      var profileId = this.getSelectedProfileId();
      var profile = this.profiles.get(profileId);
      if (profile) {
        this.model.set('profile', profile);
      }
      // address
      var addressId = this.getSelectedAddressId();
      var address = this.addresses.get(addressId);
      if (address) {
        this.model.set('address', address);
      }
      // header
      var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};

      this.model.save({}, header);
    },

    resumeSaved: function() {
      this.trigger('show:resume', this.model.id);
    },

    resumeSaveError: function(model, xhr, options) {
      var errors = this.formatErrors(xhr.responseText);
      var errorsEl = this.$('#errors').empty();
      _.each(errors, function(element, index, list) {
        var er = $('<p>').text(element);
        errorsEl.append(er);
      }, this);
    },

    newProfileSaved: function(profile) {
      this.initSelectProfileView();
      this.renderSelectProfileView();
      this.setSelectedProfileId(profile.id);
    },

    cancelNewProfile: function() {
      this.initSelectProfileView();
      this.renderSelectProfileView();
    },

    newAddressSaved: function(address) {
      this.initSelectAddressView();
      this.renderSelectAddressView();
      this.setSelectedAddressId(address.id);
    },

    cancelNewAddress: function() {
      this.initSelectAddressView();
      this.renderSelectAddressView();
    },

    formatErrors: function(errorText) {
      var error = JSON.parse(errorText);
      var errors = [];
      _.each(error, function(value, key, obj) {
        _.each(value, function(element, index, list) {
          var e = this.capitaliseFirst(key) + ' ' + element + '.';
          errors.push(e);
        }, this);
      }, this);
      return errors;
    },

    capitaliseFirst: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  });

  return EditResumeView;
});
