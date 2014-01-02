define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/resumes',

    defaults: {
      name: '',
      profile: { id: 0 }
    },

    activeAttributes: ['name'],
    activeAssociations: ['profile'],

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
        json[assoc + '_id'] = this.get(assoc).id;
      }, this);
      return { resume: json };
    }
  });

  return ResumeModel;
});
