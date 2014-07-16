define([
  'underscore',
  'backbone',
  'models/section'
], function (_, Backbone, Section) {
  'use strict';

  var SectionCollection = Backbone.Collection.extend({
    model: Section
  });

  return SectionCollection;
});
