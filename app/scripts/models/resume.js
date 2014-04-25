define([
  'underscore',
  'backbone',
  'models/profile',
  'models/address',
  'collections/item'
], function (_, Backbone, Profile, Address, ItemCollection) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({
    //urlRoot: 'http://localhost:3000/rez/resumes',

    defaults: {
      name: ''
    },

    activeAttributes: ['name'],
    hasOne: ['profile', 'address'],
    hasMany: ['item'],

    parse: function(response) {
      if (response.resume) {
        return response.resume;
      } else {
        //response.profile.parentId = response.address.parentId = response.id;
        response.address = new Address(response.address, { resumeId: response.id });
        response.profile = new Profile(response.profile, { resumeId: response.id });
        return response;
      }
    },

    toJSON: function() {
      var json = {};
      _.each(this.activeAttributes, function(attr) {
        json[attr] = this.get(attr);
      }, this);
      _.each(this.hasOne, function(assoc) {
        if (this.get(assoc)) {
          json[assoc + '_id'] = this.get(assoc).id;
        }
      }, this);
      _.each(this.hasMany, function(assoc) {
        json[assoc + '_ids'] = this.get(assoc + '_ids');
      }, this);
      return { resume: json };
    }
  });

  return ResumeModel;
});
