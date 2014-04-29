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
      r.items = new ItemCollection(r.items, options);

      return r;
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
        json[assoc + '_ids'] = this.get(assoc + 's').map(function(item) {
          return item.id;
        });
        delete json[assoc + 's'];
      }, this);

      return {
        resume: json
      };
    }
  });

  return ResumeModel;
});
