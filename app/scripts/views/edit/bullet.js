define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var EditBulletView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_bullet.ejs'],

    id: 'edit-bullet',

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return EditBulletView;
});
