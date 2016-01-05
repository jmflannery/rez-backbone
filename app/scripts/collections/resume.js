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

    initialize: function() {
      this.fetched = false;
      this.listenTo(this, 'reset', function() { this.fetched = true });
    },

    parse: function(response, options) {
      return response.resumes;
    }
  });

  return ResumeCollection;
});
