define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/select_profile',
  'views/select_address',
  'views/items/select_items',
  'views/new_profile',
  'views/new_address',
  'views/items/new',
  'views/items/edit',
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

      this.itemId = options.itemId;
      this.bulletId = options.bulletId;
      this.paragraphId = options.paragraphId;

      this.listenTo(this.model, 'sync', this.resumeSaved);
      this.listenTo(this.model, 'error', this.resumeSaveError);

      this.profiles = new ProfileCollection();
      this.addresses = new AddressCollection();
      this.items = new ItemCollection();

      $.when(
        this.profiles.fetch(),
        this.addresses.fetch(),
        this.items.fetch()
      ).then(function() {
        this.initSelectProfileView();
        this.initSelectAddressView();
        this.initSelectItemsView();
        this.trigger('resume:edit:ready');
      }.bind(this));
    },

    render: function() {
      this.$el.html(this.template());
      this.renderSelectProfileView();
      this.renderSelectAddressView();

      if (this.itemId) {
        this.renderEditItemView(this.itemId, this.bulletId, this.paragraphId);
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
      this.listenTo(this.selectItemsView, 'item:new:show', this.renderNewItemView);
      this.listenTo(this.selectItemsView, 'item:edit:show', this.renderEditItemView);
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
      this.$('#edit_profile').html(this.selectProfileView.render().el);
      if (this.model.get('profile')) {
        this.setSelectedProfileId(this.model.get('profile').id);
      }
    },

    renderSelectAddressView: function() {
      this.$('#edit_address').html(this.selectAddressView.render().el);
      if (this.model.get('address')) {
        this.setSelectedAddressId(this.model.get('address').id);
      }
    },

    renderSelectItemsView: function() {
      this.$('#edit_items').html(this.selectItemsView.render().el);
    },

    showNewProfile: function() {
      var newProfileView = new NewProfileView({
        resume: this.model,
        collection: this.profiles,
        auth: this.auth
      });
      this.listenTo(newProfileView, 'profile:new:saved', this.newProfileSaved);
      this.listenTo(newProfileView, 'profile:new:cancel', this.cancelNewProfile);
      this.$('#edit_profile').html(newProfileView.render().el);
    },

    showNewAddress: function() {
      var newAddressView = new NewAddressView({
        resume: this.model,
        collection: this.addresses,
        auth: this.auth
      });
      this.listenTo(newAddressView, 'address:new:saved', this.newAddressSaved);
      this.listenTo(newAddressView, 'address:new:cancel', this.cancelNewAddress);
      this.$('#edit_address').html(newAddressView.render().el);
    },

    renderNewItemView: function() {
      this.selectItemsView.remove();
      this.newItemView = new NewItemView({
        resume: this.model,
        collection: this.items,
        auth: this.auth
      });
      this.listenTo(this.newItemView, 'item:new:saved', this.newItemSaved);
      this.listenTo(this.newItemView, 'item:new:cancel', this.cancelNewItem);
      this.$('#edit_items').html(this.newItemView.render().el);
    },

    renderEditItemView: function(itemId, bulletId, paragraphId) {
      this.selectItemsView.remove();
      var item = this.items.get(itemId);
      if (item) {
        this.editItemView = new EditItemView({
          model: item,
          resume: this.model,
          vent: this.vent,
          auth: this.auth,
          bulletId: bulletId,
          paragraphId: paragraphId
        });

        this.listenTo(this.editItemView, 'item:edit:cancel', this.cancelEditItem);
        this.listenTo(this.editItemView, 'item:updated', this.itemUpdated);

        this.listenToOnce(this.editItemView, 'item:edit:ready', function() {
          this.$('#edit_items').html(this.editItemView.render().el);
        });
      } else {
        console.log("no item " + itemId);
      }
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
      this.cancelEditItem();
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

    cancelNewItem: function() {
      Backbone.history.navigate(this.editUrl());
      this.newItemView.remove();
      this.initSelectItemsView();
      this.renderSelectItemsView();
    },

    cancelEditItem: function() {
      Backbone.history.navigate(this.editUrl());
      this.editItemView.remove();
      this.initSelectItemsView();
      this.renderSelectItemsView();
    },

    editUrl: function() {
      return 'resumes/' + this.model.id + '/edit'
    },

    editItemUrl: function(itemId) {
      return 'resumes/' + this.model.id + '/items/' + itemId + '/edit'
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