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

    events: {
      'click #save_bullet': 'save',
      'click #cancel_bullet': 'cancel'
    },

    initialize: function(options) {
      this.auth = options.auth;
      this.listenTo(this.model, 'sync', function() {
        this.trigger('bullet:saved');
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    save: function(e) {
      e.preventDefault();
      this.model.set(this.newAttributes());
      if (this.auth) {
        var header = { headers: { 'X-Toke-Key': this.auth.token.get('key') }};
        this.model.save({}, header);
      } else {
        console.log('Not Authorized');
      }
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('bullet:edit:cancel');
    },

    newAttributes: function() {
      return {
        text: this.$('#edit_bullet_text').val()
      };
    }
  });

  return EditBulletView;
});
