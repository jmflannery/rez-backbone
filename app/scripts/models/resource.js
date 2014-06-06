define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ResourceModel = Backbone.Model.extend({

    toJSON: function() {
      // clone the attributes object
      var json = JSON.parse(JSON.stringify(this.attributes));

      // has one associations
      _.each(this.hasOne, function(assoc) {
        json[assoc + '_id'] = this.get(assoc).id;
        delete json[assoc];
      }, this);

      // has many associations
      _.each(this.hasMany, function(assoc) {
        var singular = assoc.substring(0, assoc.length - 1);
        json[singular + '_ids'] = this.get(assoc).map(function(item) {
          return item.id;
        });
        delete json[assoc];
        delete json.id;
      }, this);

      var resource = Object.create(null);
      resource[this.resource] = json;
      return resource;
    }
  });

  return ResourceModel;
});

