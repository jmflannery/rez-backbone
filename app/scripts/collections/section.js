define([
  'underscore',
  'backbone',
  'models/section',
  'config'
], function (_, Backbone, Section, config) {
  'use strict';

  var SectionCollection = Backbone.Collection.extend({
    model: Section,

    initialize: function(models, options) {
      if (options) { this.resume = options.resume; }
      this.fetched = false;
      this.listenTo(this, 'reset', function() { this.fetched = true });
    },

    url: function() {
      return config.domain + '/rez/sections';
    },

    parse: function(response, options) {
      return response.sections;
    }
  });

  return SectionCollection;
});
