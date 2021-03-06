define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/profile'
], function ($, _, Backbone, JST, Profile) {
  'use strict';

  var NewProfileView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_profile.ejs'],

    id: '#new_profile',

    initialize: function(options) {
      this.resume = options.resume;
      this.user = options.user;
      this.listenTo(this.collection, 'sync', this.profileSynced);
    },

    events: {
      'click button#save_profile': 'saveProfile',
      'click button#cancel_profile': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveProfile: function(e) {
      e.preventDefault();
      if (this.user) {
        var options = { resumeId: this.resume.id };
        var profile = new Profile(this.newAttributes(), options);
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.collection.create(profile, header);
      } else {
        console.log('Aint Authed');
      }
    },

    profileSynced: function(model, response, options) {
      this.trigger('profile:new:saved', model);
    },

    newAttributes: function() {
      return {
        firstname: this.$('#new_profile_firstname').val(),
        middlename: this.$('#new_profile_middlename').val(),
        lastname: this.$('#new_profile_lastname').val(),
        nickname: this.$('#new_profile_nickname').val(),
        prefix: this.$('#new_profile_prefix').val(),
        suffix: this.$('#new_profile_suffix').val(),
        title: this.$('#new_profile_title').val(),
        email: this.$('#new_profile_email').val()
      };
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('profile:new:cancel');
    }
  });

  return NewProfileView;
});
