define([
  'underscore',
  'backbone',
  'models/profile',
  'models/address',
  'collections/item'
], function (_, Backbone, Profile, Address, ItemCollection) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({

    defaults: {
      name: ''
    },

    activeAttributes: ['name'],
    hasOne: ['profile', 'address'],
    hasMany: ['item'],

    parse: function(response) {
      var r;
      if (response.resume) {
        r = response.resume;
      } else {
        r = response;
      }
      var options = { resumeId: this.id };
      r.address = new Address(r.address, options);
      r.profile = new Profile(r.profile, options);

      return r;
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
