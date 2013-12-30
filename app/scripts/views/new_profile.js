define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewProfileView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_profile.ejs'],

    id: '#new_profile',

    initialize: function(options) {
      this.resume = options.resume;
      this.auth = options.auth;
      this.listenTo(this.collection, 'sync', this.profileSynced);
    },

    events: {
      'click #save_profile': 'saveProfile',
      'click #cancel': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveProfile: function(e) {
      e.preventDefault();
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
        this.collection.create(this.newAttributes(), header);
      } else {
        console.log('Aint Authed');
      }
    },

    profileSynced: function(model, response, options) {
      this.trigger('profile:new:saved');
    },

    newAttributes: function() {
      return {
        profile: {
          firstname: this.$('#new_profile_firstname').val(),
          middlename: this.$('#new_profile_middlename').val(),
          lastname: this.$('#new_profile_lastname').val(),
          nickname: this.$('#new_profile_nickname').val(),
          prefix: this.$('#new_profile_prefix').val(),
          suffix: this.$('#new_profile_suffix').val(),
          title: this.$('#new_profile_title').val()
        }
      };
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('profile:new:cancel');
    }
  });

  return NewProfileView;
});
