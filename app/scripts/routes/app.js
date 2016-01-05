define([
  'backbone',
  'collections/resume',
  'collections/profile',
  'collections/address',
  'collections/section',
  'views/resumes/resume',
  'views/session',
  'lib/authenticate',
  'views/resumes/new',
  'views/resumes/list',
  'views/resumes/edit'
], function (Backbone, ResumeCollection, ProfileCollection, AddressCollection, SectionCollection, ResumeView, SessionView, Auth, NewResumeView, ResumeListView, EditResumeView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(vent, user) {
      this.vent = vent;
      this.user = user;
      this.resumes = new ResumeCollection();
      this.$page = $('#page');
    },

    routes: {
      '': 'activeResume',
      'signin': 'signin',
      'resumes': 'resumes',
      'resumes/new': 'newResume',
      'resumes/:id': 'resume',
      'resumes/:id/edit': 'editResume',
      'resumes/:resume_id/sections/:section_id/edit': 'editResumeSection',
      'resumes/:resume_id/sections/:section_id/items/:item_id/edit': 'editResumeSectionItem',
      'resumes/:resume_id/items/:item_id/bullets/new': 'newResumeItemBullet',
      'resumes/:resume_id/items/:item_id/paragraphs/new': 'newResumeItemParagraph',
      'resumes/:resume_id/items/:item_id/bullets/:bullet_id/edit': 'editResumeItemBullet'
    },

    activeResume: function() {
      this._maybeFetchResumeData(function() {
        var resume = this.resumes.get(1);
        this.renderResume(resume);
      });
    },

    signin: function() {
      var sesh = new SessionView(this.user);
      this.listenTo(sesh, 'session:authenticated', function(model, response, options) {
        this.user = Auth.authenticated(model, response, options);
        sesh.remove();
        this.navigate('/');
      });
      this.$page.prepend(sesh.render().el);
    },

    resume: function(resumeId) {
      this._maybeFetchResumeData(function() {
        var resume = this.resumes.get(resumeId);
        this.renderResume(resume);
      });
    },

    renderResume: function(resume) {
      var resumeView = new ResumeView({ model: resume, user: this.user });
      this.$page.html(resumeView.render().el);
    },

    resumes: function() {
      this._maybeFetchResumeData(function() {
        this.$page.html(new ResumeListView({
          collection: this.resumes,
          user: this.user,
          vent: this.vent
        }).render().el);
      });
    },

    newResume: function() {
      this._maybeFetchResumeData(function() {
        var newResumeView = new NewResumeView(this.resumes, this.user);
        this.$page.html(newResumeView.render().el);
      });
    },

    editResume: function(resumeId, sectionId, itemId, bulletId, paragraphId) {
      this._maybeFetchEditResumeData(function() {
        var resume = this.resumes.get(resumeId);

        this.editResumeView = new EditResumeView({
          model: resume,
          resumes: this.resumes,
          profiles: this.profiles,
          addresses: this.addresses,
          sections: this.sections,
          sectionId: sectionId,
          itemId: itemId,
          bulletId: bulletId,
          paragraphId: paragraphId,
          user: this.user,
          vent: this.vent
        });
        this.$page.html(this.editResumeView.render().el);
      });
    },

    _maybeFetchResumeData: function(callback) {
      this.resumes = this.resumes ? this.resumes : new ResumeCollection();
      if (!this.resumes.fetched) {
        this.resumes.fetch().then(function(resumes, response, options) {
          this.resumes.reset(resumes.resumes);
          callback.call(this);
        }.bind(this));
      } else {
        callback.call(this);
      }
    },

    _maybeFetchEditResumeData: function(callback) {
      this.resumes = this.resumes ? this.resumes : new ResumeCollection();
      this.profiles = this.profiles ? this.profiles : new ProfileCollection();
      this.addresses = this.addresses ? this.addresses : new AddressCollection();
      this.sections = this.sections ? this.sections : new SectionCollection();
      $.when(
        this.resumes.fetched ? null : this.resumes.fetch(),
        this.profiles.fetched ? null : this.profiles.fetch(),
        this.addresses.fetched ? null : this.addresses.fetch(),
        this.sections.fetched ? null : this.sections.fetch()
      ).then(function(resumes, profiles, addresses, sections) {
        if (resumes) { this.resumes.reset(resumes[0].resumes) }
        if (profiles) { this.profiles.reset(profiles[0].profiles) }
        if (addresses) { this.addresses.reset(addresses[0].addresses) }
        if (sections) { this.sections.reset(sections[0].sections) }
        callback.call(this);
        console.log('all fetched');
        console.log(this.resumes);
      }.bind(this));
    },

    editResumeSection: function(resumeId, sectionId) {
      this.vent.trigger('show:resume:section:edit', resumeId, sectionId);
    },

    editResumeSectionItem: function(resumeId, sectionId, itemId) {
      this.vent.trigger('show:resume:section:item:edit', resumeId, sectionId, itemId);
    },

    newResumeItemBullet: function(resumeId, itemId) {
      this.vent.trigger('show:resume:item:bullet:new', resumeId, itemId, 'new', null);
    },

    newResumeItemParagraph: function(resumeId, itemId) {
      this.vent.trigger('show:resume:item:paragraph:new', resumeId, itemId, null, 'new');
    },

    editResumeItemBullet: function(resumeId, itemId, bulletId) {
      this.vent.trigger('show:resume:item:bullet:edit', resumeId, itemId, bulletId);
    }
  });

  return AppRouter;
});
