define([
  'underscore',
  'backbone',
  'models/resume'
], function (_, Backbone, Resume) {
  'use strict';

  var ResumeCollection = Backbone.Collection.extend({
    model: Resume,

    url: 'http://localhost:3000/rez/resumes',

    parse: function(response, options) {
      return response.resumes;
    }
  });

  return ResumeCollection;
});
