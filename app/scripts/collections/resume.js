define([
  'underscore',
  'backbone',
  'models/resume',
  'config'
], function (_, Backbone, Resume, config) {
  'use strict';

  var ResumeCollection = Backbone.Collection.extend({
    model: Resume,

    url: config.domain + '/rez/resumes',

    parse: function(response, options) {
      return response.resumes;
    }
  });

  return ResumeCollection;
});
