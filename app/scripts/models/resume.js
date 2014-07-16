define([
  'underscore',
  'models/resource',
  'models/profile',
  'models/address',
  'collections/section'
], function (_, Resource, Profile, Address, SectionCollection) {
  'use strict';

  var ResumeModel = Resource.extend({

    defaults: {
      name: ''
    },

    resource: 'resume',
    hasOne: ['profile', 'address'],
    hasMany: ['sections'],

    parse: function(response) {
      if (response.resume) {
        var resp = response.resume;
      } else {
        var resp = response;
      }

      var options = { resumeId: this.id };
      resp.address = new Address(resp.address, options);
      resp.profile = new Profile(resp.profile, options);
      resp.sections = new SectionCollection(resp.sections, options);

      return resp;
    }
  });

  return ResumeModel;
});
