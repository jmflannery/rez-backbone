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

    initialize: function(attributes, options) {
      var opts = { resume: this };
      this.set('profile', new Profile(attributes.profile, opts));
      this.set('address', new Address(attributes.address, opts))
      this.set('items', new ItemCollection(attributes.items, opts));
    },

    itemIds: function() {
      return this.get('items').map(function(item) {
        return item.id;
      });
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
        resp.items = new ItemCollection(resp.items, opts);
      }

      return resp;
    }
  });

  return ResumeModel;
});
