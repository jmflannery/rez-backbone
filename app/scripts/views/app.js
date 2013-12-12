define([
  'jquery',
  'underscore',
  'backbone',
  'views/nav',
  'views/content'
], function ($, _, Backbone, NavView, ContentView) {
  'use strict';

  var AppView = Backbone.View.extend({

    el: '#page',

    initialize: function(vent) {
      this.vent = vent;
      this.vent.on('session:authenticated', this.authenticated.bind(this))
      this.nav_view = new NavView(this.vent);
      this.content_view = new ContentView(this.vent);
    },

    render: function() {
      this.$el.html(this.nav_view.render().el);
      this.$el.append(this.content_view.render().el);
      return this;
    },

    authenticated: function(user, token) {
      this.user = user;
      this.token = token;
      this.nav_view.userAuthenticated(this.user.get('username'));
      Backbone.history.navigate('/');
      this.content_view.showHome();
    }
  });

  return AppView;
});
