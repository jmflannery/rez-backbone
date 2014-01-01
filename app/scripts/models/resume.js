define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/rez/resumes',

    parse: function(response) {
      if (response.resume) {
        return response.resume;
      } else {
        return response;
      }
    },

    toJSON: function() {
      return {
        resume: this.attributes
      };
    }
  });

  return ResumeModel;
});
