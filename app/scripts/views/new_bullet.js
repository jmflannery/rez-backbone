define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewBulletView = Backbone.View.extend({

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.collection, 'sync', this.bulletSynced);
    },

    template: JST['app/scripts/templates/new_bullet.ejs'],

    events: {
      'click #save_bullet': 'saveBullet',
      'click #cancel': 'cancel'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    saveBullet: function(e) {
      console.log('saving bullet');
      e.preventDefault();
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
        this.collection.create(this.newAttributes(), header);
      } else {
        console.log('Aint Authed');
      }
    },

    newAttributes: function() {
      return {
        text: this.$('#new_bullet_text').val()
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
