define([
  'underscore',
  'backbone',
  'models/profile',
  'models/address'
], function (_, Backbone, Profile, Address) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/resumes',

    defaults: {
      name: ''
    },

    activeAttributes: ['name'],
    activeAssociations: ['profile', 'address'],
    activeManyAssociations: ['item'],

    fetchAssociatedObjects: function() {
      var profile = new Profile({ id: this.get('profile_id') }); 
      var address = new Address({ id: this.get('address_id') }); 
      $.when(
        profile.fetch(),
        address.fetch()
      ).done(function() {
        this.set('profile', profile);
        this.set('address', address);
        this.trigger('resume:loaded', this);
      }.bind(this));
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
      _.each(this.activeManyAssociations, function(assoc) {
        json[assoc + '_ids'] = this.get(assoc + '_ids');
      }, this);
      return { resume: json };
    }
  });

  return ResumeModel;
});
