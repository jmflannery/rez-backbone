define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ItemModel = Backbone.Model.extend({
    defaults: {
      name: '',
      title: '',
      heading: ''
    }
  });

  return ItemModel;
});
