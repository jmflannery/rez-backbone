define([
  'underscore',
  'models/resource',
  'models/profile',
  'models/address',
  'collections/item'
], function (_, Resource, Profile, Address, ItemCollection) {
  'use strict';

  var ResumeModel = Resource.extend({

    defaults: {
      name: ''
    },

    resource: 'resume',
    hasOne: ['profile', 'address'],
    hasMany: ['items'],

    parse: function(response) {
      if (response.resume) {
        var resp = response.resume;
      } else {
        var resp = response;
      }

      var options = { resumeId: this.id };
      resp.address = new Address(resp.address, options);
      resp.profile = new Profile(resp.profile, options);
      resp.items = new ItemCollection(resp.items, options);

      return resp;
    }
  });

  return ResumeModel;
});
