define([
  'underscore',
  'backbone',
  'models/profile',
  'config'
], function(_, Backbone, Profile, config) {
  'use strict';

  var ProfileCollection = Backbone.Collection.extend({
    model: Profile,

    url: config.domain + '/rez/profiles',

    parse: function(response) {
      return response.profiles;
    }
  });

  return ProfileCollection;
});
