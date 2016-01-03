define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NewResumeView = Backbone.View.extend({
    template: JST['app/scripts/templates/new_resume.ejs'],

    tagName: 'section',

    id: 'new_resume',

    events: {
      'click .submit_new_resume': 'addResume',
      'click .cancel_new_resume': 'cancelAddResume'
    },

    initialize: function(resumes, user) {
      this.resumes = resumes;
      this.user = user;
      this.listenTo(this.resumes, 'sync', this.resumeSynced);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    addResume: function(e) {
      if (this.user) {
        var header = { headers: { 'X-Toke-Key': this.user.get('token').get('key') }};
        this.resumes.create(this.newAttributes(), header);
      } else {
        console.log('Not Authorized');
        this.remove();
        Backbone.history.navigate('/', true);
      }
      e.preventDefault();
    },

    cancelAddResume: function(e) {
      this.remove();
      Backbone.history.navigate('/', true);
      e.preventDefault();
    },

    resumeSynced: function(model, response, options) {
      this.remove();
      Backbone.history.navigate('resumes/' + model.id, true);
    },

    newAttributes: function() {
      return {
        name: this.$('#new_resume_name').val()
      };
    }
  });

  return NewResumeView;
});
