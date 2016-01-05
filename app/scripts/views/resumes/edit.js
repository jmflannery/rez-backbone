define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/select_profile',
  'views/select_address',
  'views/sections/select_sections',
  'views/profiles/new',
  'views/addresses/new',
  'views/sections/new',
  'views/sections/edit',
  'models/profile',
  'collections/profile',
  'collections/address',
  'collections/section'
], function ($,
             _,
             Backbone,
             JST,
             SelectProfileView,
             SelectAddressView,
             SelectSectionsView,
             NewProfileView,
             NewAddressView,
             NewSectionView,
             EditSectionView,
             Profile,
             ProfileCollection,
             AddressCollection,
             SectionCollection) {
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
      this.user = options.user;
      this.vent = options.vent;

      this.sectionId = options.sectionId;
      this.itemId = options.itemId;
      this.bulletId = options.bulletId;
      this.paragraphId = options.paragraphId;

      this.profiles = options.resumes;
      this.addresses = options.addresses;
      this.sections = options.sections;

      this.listenTo(this.model, 'sync', this.resumeSaved);
      this.listenTo(this.model, 'error', this.resumeSaveError);

      this.initSelectProfileView();
      this.initSelectAddressView();
      this.initSelectSectionsView();
    },

    render: function() {
      this.$el.html(this.template());
      this.renderSelectProfileView();
      this.renderSelectAddressView();

      if (this.sectionId) {
        this.renderEditSectionView(this.sectionId);
      } else {
        this.renderSelectSectionsView();
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

    initSelectSectionsView: function() {
      this.selectSectionsView = new SelectSectionsView({
        collection: this.sections,
        resume: this.model,
        user: this.user,
        vent: this.vent
      });
      this.listenTo(this.selectSectionsView, 'section:new:show', this.renderNewSectionView);
      this.listenTo(this.selectSectionsView, 'section:edit:show', this.renderEditSectionView);
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

    getSelectedSectionIds: function() {
      return this.selectSectionsView.getSelectedSectionIds();
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

    renderSelectSectionsView: function() {
      this.$('#edit-sections').html(this.selectSectionsView.render().el);
    },

    showNewProfile: function() {
      var newProfileView = new NewProfileView({
        resume: this.model,
        collection: this.profiles,
        user: this.user
      });
      this.listenTo(newProfileView, 'profile:new:saved', this.newProfileSaved);
      this.listenTo(newProfileView, 'profile:new:cancel', this.cancelNewProfile);
      this.$('#edit_profile').html(newProfileView.render().el);
    },

    showNewAddress: function() {
      var newAddressView = new NewAddressView({
        resume: this.model,
        collection: this.addresses,
        user: this.user
      });
      this.listenTo(newAddressView, 'address:new:saved', this.newAddressSaved);
      this.listenTo(newAddressView, 'address:new:cancel', this.cancelNewAddress);
      this.$('#edit_address').html(newAddressView.render().el);
    },

    renderNewSectionView: function() {
      this.selectSectionsView.remove();
      this.newSectionView = new NewSectionView({
        resume: this.model,
        collection: this.model.get('sections'),
        user: this.user
      });
      this.listenTo(this.newSectionView, 'section:new:saved', this.newSectionSaved);
      this.listenTo(this.newSectionView, 'section:new:cancel', this.cancelNewSection);
      this.$('#edit-sections').html(this.newSectionView.render().el);
    },

    renderEditSectionView: function(sectionId) {
      this.selectSectionsView.remove();
      var section = this.sections.get(sectionId);
      if (section) {
        this.editSectionView = new EditSectionView({
          model: section,
          resume: this.model,
          itemId: this.itemId,
          vent: this.vent,
          user: this.user
        });

        this.listenTo(this.editSectionView, 'section:edit:cancel', this.cancelEditSection);
        this.listenTo(this.editSectionView, 'section:updated', this.sectionUpdated);

        this.listenToOnce(this.editSectionView, 'section:edit:ready', function() {
          this.$('#edit-sections').html(this.editSectionView.render().el);
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
      // sections
      var sectionIds = this.getSelectedSectionIds();
      var sections = _.map(sectionIds, function(sectionId) {
        return this.sections.get(sectionId);
      }, this);
      this.model.set('sections', sections);

      // header
      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.token.get('key') }};
        this.model.save({}, header);
      } else {
        console.log('Not Authorized');
      }
    },

    sectionUpdated: function() {
      this.cancelEditSection();
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

    newSectionSaved: function(address) {
      this.initSelectSectionsView();
      this.renderSelectSectionsView();
    },

    cancelNewSection: function() {
      this.newSectionView.remove();
      this.initSelectSectionsView();
      this.renderSelectSectionsView();
    },

    cancelEditSection: function() {
      this.editSectionView.remove();
      this.initSelectSectionsView();
      this.renderSelectSectionsView();
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
