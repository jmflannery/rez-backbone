define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/bullet',
  'views/select_bullets',
  'views/new_bullet'
], function ($, _, Backbone, JST, BulletCollection, SelectBulletsView, NewBulletView) {
  'use strict';

  var EditItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_item.ejs'],

    events: {
      'click #save_item': 'save',
      'click #cancel': 'cancel'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.auth = options.auth;
      this.vent = options.vent;
      this.listenTo(this.model, 'sync', this.itemSynced);

      this.bullets = new BulletCollection();
      this.listenTo(this.bullets, 'sync', this.contentLoaded);
      this.bullets.fetch();
    },

    contentLoaded: function() {
      this.initSelectBulletsView();
      this.trigger('item:edit:ready');
    },

    initSelectBulletsView: function() {
      this.selectBulletsView = new SelectBulletsView({
        collection: this.bullets,
        auth: this.auth,
        selectedBullets: this.model.get('bullet_ids')
      });
      this.listenTo(this.selectBulletsView, 'show:new:bullet', this.showNewBullet);
    },

    render: function() {
      this.$el.html(this.template());
      this.renderSelectBulletsView();
      return this;
    },

    renderSelectBulletsView: function() {
      this.$('section#bullets').html(this.selectBulletsView.render().el);
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

    newAttributes: function() {
      return {
        name: this.$('#new_item_name').val(),
        title: this.$('#new_item_title').val(),
        heading: this.$('#new_item_heading').val()
      };
    },

    itemSynced: function(model, response, options) {
      this.trigger('item:updated');
    },

    cancel: function(e) {
      e.preventDefault();
      this.vent.trigger('show:edit_resume', this.resume.id);
    },

    showNewBullet: function() {
      var nbv = new NewBulletView({
        collection: this.model.bullets,
        model: this.model,
        auth: this.auth
      });
      this.listenTo(nbv, 'bullet:new:saved', this.newBulletSaved);
      this.listenTo(nbv, 'bullet:new:cancel', this.cancelBullet);
      this.$('section#bullets').html(nbv.render().el);
    },

    newBulletSaved: function(bullet) {
      this.bullets.add(bullet);
      this.selectBulletsView.setSelectedBullets(this.model.get('bullet_ids'));
      this.renderSelectBulletsView();
    },

    cancelBullet: function() {
      this.render();
    }
  });

  return EditItemView;
});
