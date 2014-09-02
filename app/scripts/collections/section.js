define([
  'underscore',
  'backbone',
  'models/section'
], function (_, Backbone, Section) {
  'use strict';

  var SectionCollection = Backbone.Collection.extend({
    model: Section,

    initialize: function(models, options) {
      if (options) {
        this.resumeId = options.resumeId;
      }
    },

    url: function() {
      if (this.resumeId) {
        return 'http://localhost:3000/rez/resumes/' + this.resumeId + '/sections';
      } else {
        return 'http://localhost:3000/rez/sections';
      }
    },

    parse: function(response) {
      return response.sections;
    }
  });

  return SectionCollection;
});
