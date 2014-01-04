define([
  'underscore',
  'backbone',
  'models/profile'
], function (_, Backbone, Profile) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/resumes',

    defaults: {
      name: ''
    },

    activeAttributes: ['name'],
    activeAssociations: ['profile'],

    fetchAssociatedObjects: function() {
      this.fetchProfile();
    },

    fetchProfile: function() {
      if (this.get('profile_id')) {
        var profile = new Profile({ id: this.get('profile_id') }); 
        this.set('profile', profile);
        this.listenTo(profile, 'sync', this.profileFetched);
        profile.fetch();
      } else {
        this.profileFetched();
      }
    },

    profileFetched: function(model, response, options) {
      this.trigger('loaded', this);
    },

    parse: function(response) {
      if (response.resume) {
        return response.resume;
      } else {
        return response;
      }
    },

    toJSON: function() {
      var json = {};
      _.each(this.activeAttributes, function(attr) {
        json[attr] = this.get(attr);
      }, this);
      _.each(this.activeAssociations, function(assoc) {
        if (this.get(assoc)) {
          json[assoc + '_id'] = this.get(assoc).id;
        }
      }, this);
      return { resume: json };
    }
  });

  return ResumeModel;
});
