define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SelectBulletView = Backbone.View.extend({
    template: JST['app/scripts/templates/bullet.ejs'],

    tagName: 'tr',

    id: function() {
      return 'bullet_' + this.model.id;
    },

    events: {
      'click #edit_bullet': 'edit',
      'click #delete_bullet': 'destroy'
    },

    initialize: function(options) {
      this.selected = options.selected;
      this.user = options.user;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    isSelected: function() {
      return this.$('input[type=checkbox]').is(':checked');
    },

    bulletId: function() {
      return this.model.id;
    },

    edit: function(e) {
      e.preventDefault();
      this.trigger('bullet:edit', this.model.id);
    },

    destroy: function(e) {
      e.preventDefault();
      if (this.user) {
        var header = { headers: {'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized');
      }
    }
  });

  return SelectBulletView;
});
