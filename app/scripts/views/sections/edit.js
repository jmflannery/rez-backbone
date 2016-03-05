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

    urls: {
      editResume: 'resumes/:resumeId/edit'
    },

    events: {
      'click #save_section': 'save',
      'click #cancel_section': 'cancel'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.itemId = options.itemId;
      this.bulletId = options.bulletId;
      this.paragraphId = options.paragraphId;
      this.user = options.user;

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

      if (this.itemId) {
        this.renderEditItemView(this.itemId);
      } else {
        this.initSelectItemsView();
        this.renderSelectItemsView();
      }

      return this;
    },

    initSelectItemsView: function() {
      this.selectItemsView = new SelectItemsView({
        collection: this.items,
        section: this.model,
        resume: this.resume,
        user: this.user
      });
      this.listenTo(this.selectItemsView, 'item:edit:show', this.renderEditItemView);
      this.listenTo(this.selectItemsView, 'item:new:show', this.renderNewItemView);
    },

    renderSelectItemsView: function() {
      this.$('section#items').html(this.selectItemsView.render().el);
    },

    initNewItemView: function() {
      this.newItemView = new NewItemView({
        collection: this.model.get('items'),
        user: this.user
      });
      this.listenTo(this.newItemView, 'item:new:saved', this.newItemSaved);
      this.listenTo(this.newItemView, 'item:new:cancel', this.cancelNewItem);
    },

    renderNewItemView: function() {
      this.selectItemsView.remove();
      this.initNewItemView();
      this.$('section#items').html(this.newItemView.render().el);
    },

    renderSelectParagraphsView: function() {
      this.$('section#paragraphs').html(this.selectParagraphsView.render().el);
    },

    newItemSaved: function(item) {
      this.items.add(item);
      this.newItemView.remove();
      this.initSelectItemsView();
      this.renderSelectItemsView();
    },

    cancelNewItem: function() {
      this.newItemView.remove();
      this.initSelectItemsView();
      this.renderSelectItemsView();
    },

    renderEditItemView: function(itemId) {
      var item = this.items.get(itemId);
      this.editItemView = new EditItemView({
        model: item,
        section: this.model,
        resume: this.resume,
        bulletId: this.bulletId,
        paragraphId: this.paragraphId,
        user: this.user
      });
      this.listenTo(this.editItemView, 'item:edit:cancel', this.cancelEditItem);
      this.listenTo(this.editItemView, 'item:updated', this.cancelEditItem);
      this.listenTo(this.editItemView, 'item:edit:ready', function() {
        this.$('section#items').html(this.editItemView.render().el);
      });
    },

    renderEditBulletView: function(bulletId) {
      var bullet = this.bullets.get(bulletId);
      this.editBulletView = new EditBulletView({
        model: bullet,
        user: this.user
      });
      this.listenTo(this.editBulletView, 'bullet:edit:cancel', this.cancelEditBullet);
      this.listenTo(this.editBulletView, 'bullet:saved', function() {
        this.renderSelectBulletsView();
      });
      this.$('section#bullets').html(this.editBulletView.render().el);
    },

    cancelEditBullet: function() {
      this.editBulletView.remove();
      delete this.bulletId;
      this.initSelectBulletsView();
      this.renderSelectBulletsView();
    },

    itemUpdated: function() {
    },

    cancelEditItem: function() {
      this.initSelectItemsView();
      this.renderSelectItemsView();
    },

    save: function(e) {
      e.preventDefault();
      this.model.set(this.newAttributes());

      // items
      var itemIds = this.getSelectedItemIds();
      var items = _.map(itemIds, function(itemId) {
        return this.items.get(itemId);
      }, this);

      this.model.set('items', items);

      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.save({}, header);
      } else {
        console.log('Not Authorized');
      }
    },

    newAttributes: function() {
      return {
        name: this.$('#new_section_name').val(),
        heading: this.$('#new_section_heading').val(),
        subheading: this.$('#new_section_subheading').val()
      };
    },

    getSelectedItemIds: function() {
      return this.selectItemsView.getSelectedItemIds();
    },

    cancel: function(e) {
      e.preventDefault();
      Backbone.history.navigate(this.editResumeUrl());
      this.trigger('section:edit:cancel');
    },

    renderNewBullet: function() {
      this.newBulletView = new NewBulletView({
        collection: this.model.get('bullets'),
        model: this.model,
        user: this.user
      });
      this.listenTo(this.newBulletView, 'bullet:new:saved', this.newBulletSaved);
      this.listenTo(this.newBulletView, 'bullet:new:cancel', this.cancelNewBullet);
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
        user: this.user
      });
      this.listenTo(this.newParagraphView, 'paragraph:new:saved', this.newParagraphSaved);
      this.listenTo(this.newParagraphView, 'paragraph:new:cancel', this.cancelNewParagraph);
      this.$('section#paragraphs').html(this.newParagraphView.render().el);
    },

    cancelNewParagraph: function() {
      this.newParagraphView.remove();
      this.initSelectParagraphsView();
      this.renderSelectParagraphsView();
    },

    editResumeUrl: function() {
      return this.urls['editResume'].replace(/:resumeId/, this.resume.id);
    }
  });

  return EditSectionView;
});
