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
        this.resume = options.resume;
      }
    },

    url: function() {
      if (this.resume) {
        return 'http://localhost:3000/rez/resumes/' + this.resume.id + '/sections';
      } else {
        return 'http://localhost:3000/rez/sections';
      }
    },

    parse: function(response, options) {
      return response.sections;
    }
  });

  return SectionCollection;
});
