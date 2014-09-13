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

    initialize: function(attributes, options) {
      var options = { resumeId: this.id };
      this.set('profile', new Profile(attributes.profile, options));
      this.set('address', new Address(attributes.address, options))
      this.set('sections', new SectionCollection(attributes.sections, options));
    },

    parse: function(response, options) {
      if (response.resume) {
        var resp = response.resume;
      } else {
        var resp = response;
      }

      if (this.id) {
        var opts = { resumeId: this.id };
        resp.profile = new Profile(resp.profile, opts);
        resp.address = new Address(resp.address, opts);
        resp.sections = new SectionCollection(resp.sections, opts);
      }

      return resp;
    }
  });

  return ResumeModel;
});
