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
  'views/paragraphs/select_paragraphs',
  'views/paragraphs/edit'
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
             SelectParagraphsView,
             EditParagraphView) {
  'use strict';

  var EditItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/edit_item.ejs'],

    id: 'edit-item',

    urls: {
      editSection: '/resumes/:resumeId/sections/:sectionId/edit'
    },

    events: {
      'click #save_item': 'save',
      'click #cancel_item': 'cancel'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.section = options.section;
      this.bulletId = options.bulletId;
      this.paragraphId = options.paragraphId;
      this.user = options.user;

      this.listenTo(this.model, 'sync', function(model, response, options) {
        this.trigger('item:updated');
      });

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

      if (this.bulletId && this.bulletId !== 'new') {
        this.renderEditBulletView(this.bulletId);
        this.initSelectParagraphsView();
        this.renderSelectParagraphsView();
      } else if (this.paragraphId && this.paragraphId !== 'new') {
        this.renderEditParagraphView(this.paragraphId);
        this.initSelectBulletsView();
        this.renderSelectBulletsView();
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
        user: this.user,
        selectedBullets: this.model.bulletIds()
      });
      this.listenTo(this.selectBulletsView, 'show:new:bullet', this.renderNewBullet);
      this.listenTo(this.selectBulletsView, 'bullet:edit:show', this.renderEditBulletView);
    },

    initSelectParagraphsView: function() {
      this.selectParagraphsView = new SelectParagraphsView({
        collection: this.paragraphs,
        user: this.user,
        selectedParagraphs: this.model.paragraphIds(),
      });
      this.listenTo(this.selectParagraphsView, 'paragraph:new', this.renderNewParagraph);
      this.listenTo(this.selectParagraphsView, 'paragraph:edit:show', this.renderEditParagraphView);
    },

    renderSelectBulletsView: function() {
      this.$('section#bullets').html(this.selectBulletsView.render().el);
    },

    renderSelectParagraphsView: function() {
      this.$('section#paragraphs').html(this.selectParagraphsView.render().el);
    },

    renderEditBulletView: function(bulletId) {
      var bullet = this.bullets.get(bulletId);
      this.editBulletView = new EditBulletView({
        model: bullet,
        user: this.user
      });
      this.listenTo(this.editBulletView, 'bullet:edit:cancel', this.cancelEditBullet);
      this.listenTo(this.editBulletView, 'bullet:saved', function() {
        Backbone.history.navigate(this.editItemUrl());
        this.initSelectBulletsView();
        this.renderSelectBulletsView();
      });
      this.$('section#bullets').html(this.editBulletView.render().el);
      Backbone.history.navigate(this.editBulletUrl(bullet));
    },

    cancelEditBullet: function() {
      Backbone.history.navigate(this.editItemUrl());
      this.editBulletView.remove();
      delete this.bulletId;
      this.initSelectBulletsView();
      this.renderSelectBulletsView();
    },

    renderEditParagraphView: function(paragraphId) {
      var paragraph = this.paragraphs.get(paragraphId);
      this.editParagraphView = new EditParagraphView({
        model: paragraph,
        user: this.user
      });
      this.listenTo(this.editParagraphView, 'paragraph:edit:cancel', this.cancelEditParagraph);
      this.listenTo(this.editParagraphView, 'paragraph:saved', function() {
        Backbone.history.navigate(this.editItemUrl());
        this.initSelectParagraphsView();
        this.renderSelectParagraphsView();
      });
      this.$('section#paragraphs').html(this.editParagraphView.render().el);
      Backbone.history.navigate(this.editParagraphUrl(paragraph));
    },

    cancelEditParagraph: function() {
      Backbone.history.navigate(this.editItemUrl());
      this.editParagraphView.remove();
      delete this.paragraphId;
      this.initSelectParagraphsView();
      this.renderSelectParagraphsView();
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

      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.model.save({}, header);
      } else {
        console.log('Not Authorized');
      }
    },

    newAttributes: function() {
      return {
        name: this.$('#new-item-name').val(),
        title: this.$('#new-item-title').val(),
        heading: this.$('#new-item-heading').val()
      };
    },

    getSelectedBulletIds: function() {
      return this.selectBulletsView.getSelectedBulletIds();
    },

    getSelectedParagraphIds: function() {
      return this.selectParagraphsView.getSelectedParagraphIds();
    },

    cancel: function(e) {
      e.preventDefault();
      Backbone.history.navigate(this.editSectionUrl());
      this.trigger('item:edit:cancel');
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

    newParagraphSaved: function(paragraph) {
      this.paragraphs.add(paragraph);
      this.selectParagraphsView.setSelectedParagraphs(this.model.get('paragraph_ids'));
      this.renderSelectParagraphsView();
    },

    cancelNewParagraph: function() {
      this.newParagraphView.remove();
      this.initSelectParagraphsView();
      this.renderSelectParagraphsView();
    },

    editItemUrl: function() {
      return '/resumes/:resumeId/sections/:sectionId/items/:itemId/edit'
        .replace(/:resumeId/, this.resume.id)
        .replace(/:sectionId/, this.section.id)
        .replace(/:itemId/, this.model.id);
    },

    editBulletUrl: function(bullet) {
      return '/resumes/:resumeId/sections/:sectionId/items/:itemId/bullets/:bulletId/edit'
        .replace(/:resumeId/, this.resume.id)
        .replace(/:sectionId/, this.section.id)
        .replace(/:itemId/, this.model.id)
        .replace(/:bulletId/, bullet.id);
    },

    editParagraphUrl: function(paragraph) {
      return '/resumes/:resumeId/sections/:sectionId/items/:itemId/paragraphs/:paragraphId/edit'
        .replace(/:resumeId/, this.resume.id)
        .replace(/:sectionId/, this.section.id)
        .replace(/:itemId/, this.model.id)
        .replace(/:paragraphId/, paragraph.id);
    },

    editSectionUrl: function() {
      return this.urls['editSection'].replace(/:resumeId/, this.resume.id).replace(/:sectionId/, this.section.id);
    }
  });

  return EditItemView;
});
