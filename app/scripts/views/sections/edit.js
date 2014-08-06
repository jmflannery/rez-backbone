define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/item',
  'views/items/new',
  'views/items/select_items',
  'views/items/edit'
], function ($,
             _,
             Backbone,
             JST,
             ItemCollection,
             NewItemView,
             SelectItemsView,
             EditItemView) {
  'use strict';

  var EditSectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_section.ejs'],

    id: 'edit-section',

    events: {
      'click #save_item': 'save',
      'click #cancel': 'cancel'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.auth = options.auth;
      this.vent = options.vent;

      this.listenTo(this.model, 'sync', function(model, response, options) {
        this.trigger('section:updated');
      });

      this.items = new ItemCollection();

      $.when(
        this.items.fetch()
      ).then(function() {
        this.trigger('section:edit:ready');
      }.bind(this));
    },

    render: function() {
      this.$el.html(this.template());

      this.initSelectItemsView();
      this.renderSelectItemsView();

      return this;
    },

    initSelectItemsView: function() {
      this.selectItemsView = new SelectItemsView({
        collection: this.items,
        section: this.model,
        auth: this.auth,
        selectedItems: this.model.itemIds()
      });
      this.listenTo(this.selectItemsView, 'show:new:bullet', this.renderNewBullet);
      this.listenTo(this.selectItemsView, 'bullet:edit:show', this.renderEditBulletView);
    },

    renderSelectItemsView: function() {
      this.$('section#items').html(this.selectItemsView.render().el);
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

      var paragraphs = _.map(this.getSelectedParagraphIds(), function(paragraphId) {
        return this.paragraphs.get(paragraphId);
      }, this);
      this.model.set('paragraphs', paragraphs);

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

    getSelectedItemIds: function() {
      return this.selectItemsView.getSelectedItemIds();
    },

    cancel: function(e) {
      e.preventDefault();
      this.trigger('section:edit:cancel');
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
      return "resumes/" + this.resume.id + "/sections/" + this.model.id;
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

  return EditSectionView;
});
