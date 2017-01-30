import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['admin-sidebar'],
  routing: Ember.inject.service('-routing'),

  actions: {
    transitionTo(route) {
      this.get('routing').transitionTo(route);
    },
    showNavbar() {
      Ember.$("#admin-sidebar-show").hide();
      Ember.$("#admin-sidebar").show(200);
      Ember.$("#admin-sidebar-teardown").show();
      Ember.$("#admin-content-wrapper").addClass("admin-content-blur");
    },
    teardownNavbar() {
      Ember.$("#admin-sidebar").hide(200);
      Ember.$("#admin-sidebar-show").show();
      Ember.$("#admin-content-wrapper").removeClass("admin-content-blur");
    }
  }
});
