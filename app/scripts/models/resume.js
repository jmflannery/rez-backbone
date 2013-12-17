define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ResumeModel = Backbone.Model.extend({

    urlRoot: 'http://localhost:3000/rez/resumes'
  });

  return ResumeModel;
});
