import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    logout() {
      this.get('session').invalidate();
      this.get('routing').transitionTo("/");
    }
  }
});
