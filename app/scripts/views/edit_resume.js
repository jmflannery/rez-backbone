define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/select_profile',
  'views/select_address',
  'views/select_items',
  'views/new_profile',
  'views/new_address',
  'views/new_item',
  'views/edit_item',
  'models/profile',
  'collections/profile',
  'collections/address',
  'collections/item'
], function ($, _, Backbone, JST, SelectProfileView, SelectAddressView, SelectItemsView, NewProfileView, NewAddressView, NewItemView, EditItemView, Profile, ProfileCollection, AddressCollection, ItemCollection) {
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
      this.vent = options.vent;

      if (options.item) { this.item = options.item; }

      this.listenTo(this.model, 'sync', this.resumeSaved);
      this.listenTo(this.model, 'error', this.resumeSaveError);

      this.profiles = new ProfileCollection();
      this.addresses = new AddressCollection();
      this.items = new ItemCollection();

      $.when(
        this.profiles.fetch(),
        this.addresses.fetch(),
        this.items.fetch()
      ).then(this.loaded.bind(this));
    },

    loaded: function() {
      this.initSelectProfileView();
      this.initSelectAddressView();
      this.initSelectItemsView();
      this.trigger('resume:edit:ready');
    },

    render: function() {
      this.$el.html(this.template());
      this.renderSelectProfileView();
      this.renderSelectAddressView();
      if (this.item) {
        this.showEditItem(this.item);
      } else {
        this.renderSelectItemsView();
      }

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

    initSelectItemsView: function() {
      this.selectItemsView = new SelectItemsView({
        collection: this.items,
        resume: this.model,
        auth: this.auth,
        vent: this.vent
      });
      this.listenTo(this.selectItemsView, 'show:new:item', this.showNewItem);
      this.listenTo(this.selectItemsView, 'edit:item:show', this.showEditItem);
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

    getSelectedItemIds: function() {
      return this.selectItemsView.getSelectedItemIds();
    },

    renderSelectProfileView: function() {
      this.$('#profile').html(this.selectProfileView.render().el);
      if (this.model.get('profile')) {
        this.setSelectedProfileId(this.model.get('profile').id);
      }
    },

    renderSelectAddressView: function() {
      this.$('#address').html(this.selectAddressView.render().el);
      if (this.model.get('address')) {
        this.setSelectedAddressId(this.model.get('address').id);
      }
    },

    renderSelectItemsView: function() {
      this.$('#items').html(this.selectItemsView.render().el);
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

    showNewItem: function() {
      var newItemView = new NewItemView({
        resume: this.model,
        collection: this.items,
        auth: this.auth
      });
      this.listenTo(newItemView, 'item:new:saved', this.newItemSaved);
      this.listenTo(newItemView, 'item:new:cancel', this.cancelItem);
      this.$('#items').html(newItemView.render().el);
    },

    showEditItem: function(item) {
      Backbone.history.navigate('resumes/' + this.model.id + '/items/' + item.id + '/edit');
      var editItemView = new EditItemView({
        model: item,
        resume: this.model,
        vent: this.vent,
        auth: this.auth
      });
      this.listenTo(editItemView, 'item:edit:cancel', this.cancelItem);
      this.listenTo(editItemView, 'item:updated', this.itemUpdated);
      this.listenToOnce(editItemView, 'item:edit:ready', function() {
        this.$('#items').html(editItemView.render().el);
      });
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
      // items
      var itemIds = this.getSelectedItemIds();
      var items = _.map(itemIds, function(itemId) {
        return this.items.get(itemId);
      }, this);
      this.model.set('items', items);

      // header
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
        this.model.save({}, header);
      } else {
        console.log('Not Authorized');
      }
    },

    itemUpdated: function() {
      this.cancelItem();
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

    newItemSaved: function(address) {
      this.initSelectItemsView();
      this.renderSelectItemsView();
    },

    cancelItem: function() {
      this.initSelectItemsView();
      this.renderSelectItemsView();
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
