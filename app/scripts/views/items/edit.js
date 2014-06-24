define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/bullet',
  'collections/paragraph',
  'views/bullets/new',
  'views/bullets/select_bullets',
  'views/bullets/edit',
  'views/paragraphs/new',
  'views/paragraphs/select'
], function ($,
             _,
             Backbone,
             JST,
             BulletCollection,
             ParagraphCollection,
             NewBulletView,
             SelectBulletsView,
             EditBulletView,
             NewParagraphView,
             SelectParagraphsView) {
  'use strict';

  var EditItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_item.ejs'],

    id: 'edit-item',

    events: {
      'click #save_item': 'save',
      'click #cancel': 'cancel'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.bulletId = options.bulletId;
      this.paragraphId = options.paragraphId;
      this.auth = options.auth;
      this.vent = options.vent;

      this.listenTo(this.model, 'sync', this.itemSynced);

      this.bullets = new BulletCollection();
      this.paragraphs = new ParagraphCollection();

      $.when(
        this.bullets.fetch(),
        this.paragraphs.fetch()
      ).then(function() {
        this.trigger('item:edit:ready');
      }.bind(this));
    },

    render: function() {
      this.$el.html(this.template());

      // TODO: Refactor this.
      // Need to reduce the amount of times
      // Backbone.history.navigate is called.
      if (this.bulletId && this.bulletId !== 'new') {
        this.renderEditBulletView(this.bulletId);
      } else {
        if (this.bulletId === 'new') {
          this.initSelectParagraphsView();
          this.renderSelectParagraphsView();
          this.renderNewBullet();
        } else if (this.paragraphId === 'new') {
          this.initSelectBulletsView();
          this.renderSelectBulletsView();
          this.renderNewParagraph();
        } else {
          this.initSelectBulletsView();
          this.initSelectParagraphsView();
          this.renderSelectBulletsView();
          this.renderSelectParagraphsView();
        }
      }

      return this;
    },

    initSelectBulletsView: function() {
      this.selectBulletsView = new SelectBulletsView({
        collection: this.bullets,
        auth: this.auth,
        selectedBullets: this.model.bulletIds()
      });
      this.listenTo(this.selectBulletsView, 'show:new:bullet', this.renderNewBullet);
      this.listenTo(this.selectBulletsView, 'bullet:edit:show', this.renderEditBulletView);
    },

    initSelectParagraphsView: function() {
      this.selectParagraphsView = new SelectParagraphsView({
        collection: this.paragraphs,
        auth: this.auth,
        selectedParagraph: this.model.paragraphIds()
      });
      this.listenTo(this.selectParagraphsView, 'paragraph:new', this.renderNewParagraph);
    },

    renderSelectBulletsView: function() {
      this.$('section#bullets').html(this.selectBulletsView.render().el);
      Backbone.history.navigate(this.editUrl());
    },

    renderSelectParagraphsView: function() {
      this.$('section#paragraphs').html(this.selectParagraphsView.render().el);
      Backbone.history.navigate(this.editUrl());
    },

    renderEditBulletView: function(bulletId) {
      var bullet = this.bullets.get(bulletId);
      this.editBulletView = new EditBulletView({
        model: bullet,
        auth: this.auth
      });
      this.listenTo(this.editBulletView, 'bullet:edit:cancel', this.cancelEditBullet);
      this.listenTo(this.editBulletView, 'bullet:saved', function() {
        this.renderSelectBulletsView();
      });
      this.$('section#bullets').html(this.editBulletView.render().el);
      Backbone.history.navigate(this.editBulletUrl(bullet.id));
    },

    cancelEditBullet: function() {
      this.editBulletView.remove();
      delete this.bulletId;
      this.initSelectBulletsView();
      this.renderSelectBulletsView();
    },

    save: function(e) {
      e.preventDefault();
      this.model.set(this.newAttributes());

      var bullets = _.map(this.getSelectedBulletIds(), function(bulletId) {
        return this.bullets.get(bulletId);
      }, this);
      this.model.set('bullets', bullets);

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

    getSelectedBulletIds: function() {
      return this.selectBulletsView.getSelectedBulletIds();
    },

    itemSynced: function(model, response, options) {
      this.trigger('item:updated');
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('item:edit:cancel');
    },

    renderNewBullet: function() {
      this.newBulletView = new NewBulletView({
        collection: this.model.get('bullets'),
        model: this.model,
        auth: this.auth
      });
      this.listenTo(this.newBulletView, 'bullet:new:saved', this.newBulletSaved);
      this.listenTo(this.newBulletView, 'bullet:new:cancel', this.cancelNewBullet);
      Backbone.history.navigate(this.newBullet());
      this.$('section#bullets').html(this.newBulletView.render().el);
    },

    newBulletSaved: function(bullet) {
      this.bullets.add(bullet);
      this.selectBulletsView.setSelectedBullets(this.model.get('bullet_ids'));
      this.renderSelectBulletsView();
    },

    cancelNewBullet: function() {
      this.newBulletView.remove();
      this.initSelectBulletsView();
      this.renderSelectBulletsView();
    },

    renderNewParagraph: function() {
      this.newParagraphView = new NewParagraphView({
        collection: this.model.get('paragraphs'),
        model: this.model,
        auth: this.auth
      });
      this.listenTo(this.newParagraphView, 'paragraph:new:saved', this.newParagraphSaved);
      this.listenTo(this.newParagraphView, 'paragraph:new:cancel', this.cancelNewParagraph);
      Backbone.history.navigate(this.newParagraphUrl());
      this.$('section#paragraphs').html(this.newParagraphView.render().el);
    },

    cancelNewParagraph: function() {
      this.newParagraphView.remove();
      this.initSelectParagraphsView();
      this.renderSelectParagraphsView();
    },

    baseUrl: function() {
      return "resumes/" + this.resume.id + "/items/" + this.model.id;
    },

    editUrl: function() {
      return this.baseUrl() + "/edit";
    },

    editBulletUrl: function(bulletId) {
      return this.baseUrl() + "/bullets/" + bulletId + "/edit";
    },

    newBullet: function() {
      return this.baseUrl() + "/bullets/new";
    },

    newParagraphUrl: function() {
      return this.baseUrl() + "/paragraphs/new";
    }
  });

  return EditItemView;
});
