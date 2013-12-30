define([
  'underscore',
  'backbone',
  'models/profile'
], function(_, Backbone, Profile) {
  'use strict';

  var ProfileCollection = Backbone.Collection.extend({
    model: Profile,

    url: 'http://localhost:3000/rez/profiles',

    parse: function(response) {
      return response.profiles;
    }
  });

  return ProfileCollection;
});
