define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewBulletView = Backbone.View.extend({

    initialize: function(options) {
      this.user = options.user;
      this.listenTo(this.collection, 'sync', this.bulletSynced);
    },

    template: JST['app/scripts/templates/new_bullet.ejs'],

    events: {
      'click #save_bullet': 'saveBullet',
      'click #cancel_bullet': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveBullet: function(e) {
      e.preventDefault();
      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.collection.create(this.newAttributes(), header);
      } else {
        console.log('Aint Authed');
      }
    },

    newAttributes: function() {
      return {
        text: this.$('#new_bullet_text').val(),
        point_type: 'bullet'
      };
    },

    bulletSynced: function(model, response, options) {
      this.trigger('bullet:new:saved', model);
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('bullet:new:cancel');
    }
  });

  return NewBulletView;
});
