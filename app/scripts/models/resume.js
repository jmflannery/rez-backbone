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

    hasOne: ['profile', 'address'],
    hasMany: ['items'],

    initialize: function(attributes, options) {
      var options = { resumeId: this.id };
      this.set('address', new Address(attributes.address, options));
      this.set('profile', new Profile(attributes.profile, options));
      this.set('items', new ItemCollection(attributes.items, options));
    },

    parse: function(response) {
      if (response.resume) {
        return response.resume;
      } else {
        return response;
      }
    },

    toJSON: function() {
      var json = JSON.parse(JSON.stringify(this.attributes));

      // has one associations
      _.each(this.hasOne, function(assoc) {
        json[assoc + '_id'] = this.get(assoc).id;
        delete json[assoc];
      }, this);

      // has many associations
      _.each(this.hasMany, function(assoc) {
        var singular = assoc.substring(0, assoc.length - 1);
        json[singular + '_ids'] = this.get(assoc).map(function(item) {
          return item.id;
        });
        delete json[assoc];
      }, this);

      return {
        resume: json
      };
    }
  });

  return ResumeModel;
});
