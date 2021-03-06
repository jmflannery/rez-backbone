// This view represents a div containing a list of Sections to be selected
// and a link to create a new Section.

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/sections/select_section'
], function ($, _, Backbone, JST, SectionView) {
  'use strict';

  var SelectSectionsView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_sections.ejs'],

    id: 'select_sections',

    urls: {
      newSection: '/resumes/:resumeId/sections/new'
    },

    events: {
      'click .new_section': 'newSection'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.user = options.user;
      this.listenTo(this.collection, 'remove', this.render);
    },

    render: function() {
      this.$el.html(this.template());
      var $tbody = this.$('tbody');
      this.sectionViews = [];

      this.collection.each(function(section) {
        var sectionView = new SectionView({
          model: section,
          resume: this.resume,
          user: this.user
        });

        this.listenToOnce(sectionView, 'section:edit', function(sectionId) {
          this.trigger('section:edit:show', sectionId);
        });

        this.sectionViews.push(sectionView);

        $tbody.append(sectionView.render().el);
      }, this);

      this.setSectionsSelected();

      return this;
    },

    setSectionsSelected: function() {
      this.resume.get('sections').each(function(section) {
        this.$('tr#section_' + section.id + ' input[type=checkbox]').prop('checked', true);
      }, this);
    },

    getSelectedSectionIds: function() {
      var section_ids = [];
      _.each(this.sectionViews, function(sectionView) {
        if (sectionView.isSelected()) {
          section_ids.push(sectionView.sectionId());
        }
      });
      return section_ids;
    },

    newSection: function(e) {
      e.preventDefault();
      Backbone.history.navigate(this.newSectionUrl());
      this.trigger('section:new:show');
    },

    newSectionUrl: function() {
      return this.urls['newSection'].replace(/:resumeId/, this.resume.id);
    }
  });

  return SelectSectionsView;
});
