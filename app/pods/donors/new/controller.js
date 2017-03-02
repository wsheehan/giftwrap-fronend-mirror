import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setControllerProp(e, prop) {
      this.set(prop, e);
    },
    teardownModal() {
      this.set("successObject", null);
      this.set("failureObject", null);
    }
  }
});
