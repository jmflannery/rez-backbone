define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectProfileView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_profile.ejs'],

    id: 'select_profile',

    events: {
      'click #new_profile': 'newProfile'
    },

    render: function() {
      this.$el.html(this.template());
      this.loadProfileDropDown();
      return this;
    },

    loadProfileDropDown: function() {
      var dropDown = this.$('select#resume_profile');
      dropDown.append($('<option>').val(0).text(''));
      this.collection.each(function(profile) {
        dropDown.append($('<option>')
          .val(profile.id)
          .text(profile.get('title')));
      });
    },

    setSelectedProfile: function(profileId) {
      this.dropDown = this.$('select#resume_profile');
      this.dropDown.val(profileId);
    },

    getSelectedProfileId: function() {
      return this.$('select#resume_profile').val();
    },

    newProfile: function(e) {
      e.preventDefault();
      this.trigger('show:new:profile');
    }
  });

  return SelectProfileView;
});
