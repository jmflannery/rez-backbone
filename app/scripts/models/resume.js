define([
  'underscore',
  'backbone',
  'models/profile',
  'models/address',
  'collections/item'
], function (_, Backbone, Profile, Address, ItemCollection) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/resumes',

    defaults: {
      name: ''
    },

    activeAttributes: ['name'],
    hasOne: ['profile', 'address'],
    hasMany: ['item'],

    load: function() {
      var profile = new Profile({ parent: this });
      var address = new Address({ parent: this });
      var items = new ItemCollection({ parent: this });
      $.when(
        profile.fetch(),
        address.fetch(),
        items.fetch()
      ).done(function() {
        this.set('profile', profile);
        this.set('address', address);
        this.set('items', items);
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
