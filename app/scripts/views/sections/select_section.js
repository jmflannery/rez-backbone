define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/select_section.ejs'],

    tagName: 'tr',

    id: function() {
      return 'section_' + this.model.id;
    },

    events: {
      'click #edit_section': 'edit',
      'click #delete_section': 'destroy'
    },

    initialize: function(options) {
      this.resume = options.resume;
      this.auth = options.auth;
      this.vent = options.vent;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    edit: function(e) {
      e.preventDefault();
      this.trigger('section:edit', this.model.id);
    },

    destroy: function(e) {
      e.preventDefault();
      if (this.auth) {
        var header = { headers: {'X-Toke-Key': this.auth.token.get('key') }};
        this.model.destroy(header);
      } else {
        console.log('Not Authorized');
      }
    },

    isSelected: function() {
      return this.$('input[type=checkbox]').is(':checked');
    },

    sectionId: function() {
      return this.model.id;
    }
  });

  return SectionView;
});
