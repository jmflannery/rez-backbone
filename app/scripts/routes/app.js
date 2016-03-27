define([
  'backbone',
  'collections/resume',
  'collections/profile',
  'collections/address',
  'collections/item',
  'views/resumes/resume',
  'views/session',
  'lib/authenticate',
  'views/resumes/new',
  'views/resumes/list',
  'views/resumes/edit'
], function (Backbone, ResumeCollection, ProfileCollection, AddressCollection, ItemCollection, ResumeView, SessionView, Auth, NewResumeView, ResumeListView, EditResumeView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(vent, user) {
      this.vent = vent;
      this.user = user;
      this.resumes = new ResumeCollection();
      this.profiles = new ProfileCollection();
      this.addresses = new AddressCollection();
      this.items = new ItemCollection();
      this.$page = $('#page');
    },

    routes: {
      '': 'activeResume',
      'signin': 'signin',
      'resumes': 'resumes',
      'resumes/new': 'newResume',
      'resumes/:id': 'resume',
      'resumes/:id/edit': 'editResume',
      'resumes/:resume_id/items/:item_id/edit': 'editResumeItem',
      'resumes/:resume_id/sections/:section_id/items/:item_id/bullets/:bullet_id/edit': 'editResumeSectionItemBullet',
      'resumes/:resume_id/sections/:section_id/items/:item_id/paragraphs/:paragraph_id/edit': 'editResumeSectionItemParagraph'
    },

    activeResume: function() {
      this._maybeFetchResumes(function(resumes) {
        this.renderResume(resumes.get(1));
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
      this._maybeFetchResumes(function(resumes) {
        var resume = resumes.get(resumeId);
        this.renderResume(resume);
      });
    },

    renderResume: function(resume) {
      var resumeView = new ResumeView({ model: resume, user: this.user });
      this.$page.html(resumeView.render().el);
    },

    resumes: function() {
      this._maybeFetchResumes(function(resumes) {
        this.$page.html(new ResumeListView({
          collection: resumes,
          user: this.user,
          vent: this.vent
        }).render().el);
      });
    },

    newResume: function() {
      this._maybeFetchResumes(function(resumes) {
        var newResumeView = new NewResumeView(resumes, this.user);
        this.$page.html(newResumeView.render().el);
      });
    },

    editResume: function(resumeId, itemId, bulletId, paragraphId) {
      this._maybeFetchEditResumeData(function(resumes, profiles, addresses, items) {
        var resume = resumes.get(resumeId);

        if (resume) {
          this.editResumeView = new EditResumeView({
            model: resume,
            resumes: resumes,
            profiles: profiles,
            addresses: addresses,
            items: items,
            itemId: itemId,
            bulletId: bulletId,
            paragraphId: paragraphId,
            user: this.user,
            vent: this.vent
          });
          this.$page.html(this.editResumeView.render().el);
        }
      });
    },

    editResumeSection: function(resumeId, sectionId) {
      this.editResume(resumeId, sectionId);
    },

    editResumeItem: function(resumeId, itemId) {
      this.editResume(resumeId, itemId);
    },

    editResumeSectionItemBullet: function(resumeId, sectionId, itemId, bulletId) {
      this.editResume(resumeId, sectionId, itemId, bulletId);
    },

    editResumeSectionItemParagraph: function(resumeId, sectionId, itemId, paragraphId) {
      this.editResume(resumeId, sectionId, itemId, null, paragraphId);
    },

    _maybeFetchResumes: function(callback) {
      if (!this.resumes.fetched) {
        this.resumes.fetch().then(function(resumes, response, options) {
          this.resumes.reset(resumes.resumes);
          callback.call(this, this.resumes);
        }.bind(this));
      } else {
        callback.call(this, this.resumes);
      }
    },

    _maybeFetchEditResumeData: function(callback) {
      $.when(
        this.resumes.fetched ? null : this.resumes.fetch(),
        this.profiles.fetched ? null : this.profiles.fetch(),
        this.addresses.fetched ? null : this.addresses.fetch(),
        this.items.fetched ? null : this.items.fetch()
      ).then(function(resumes, profiles, addresses, items) {
        if (resumes) { this.resumes.reset(resumes[0].resumes) }
        if (profiles) { this.profiles.reset(profiles[0].profiles) }
        if (addresses) { this.addresses.reset(addresses[0].addresses) }
        if (items) { this.items.reset(items[0].items) }
        callback.call(this, this.resumes, this.profiles, this.addresses, this.items);
      }.bind(this));
    }
  });

  return AppRouter;
});
