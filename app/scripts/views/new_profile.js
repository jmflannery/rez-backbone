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

    events: {
      'click #save_profile': 'saveProfile',
      'click #cancel': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveProfile: function(e) {
      e.preventDefault()
      var firstname = this.$('#new_profile_firstname').val();
      var middlename = this.$('#new_profile_middlename').val();
      var lastname = this.$('#new_profile_lastname').val();
      var nickname = this.$('#new_profile_nickname').val();
      var prefix = this.$('#new_profile_prefix').val();
      var suffix = this.$('#new_profile_suffix').val();
      var title = this.$('#new_profile_title').val();
      console.log(firstname, middlename, lastname, nickname, prefix, suffix, title);
    },

    cancel: function(e) {
      e.preventDefault();
      console.log('Canceled.');
    }
  });

  return NewProfileView;
});
