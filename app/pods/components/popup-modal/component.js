import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["popup-modal", "clearfix"],
  routing: Ember.inject.service('-routing'),

  click(event) {
    const classes = $(event.target).attr("class")
    if (classes.includes("popup-modal")) {
      this.sendAction("teardownModal");
    }
  },

  actions: {
    goToDonor(id) {
      this.get('routing').transitionTo("donors.show", id);
    },
    reloadPage() {
      this.get('routing').transitionTo("donors.new");
    },
    tryAgain() {
      this.sendAction("teardownModal");
    }
  }
});
