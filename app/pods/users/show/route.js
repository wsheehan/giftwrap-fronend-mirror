import Ember from 'ember';
import ENV from 'giftwrap/config/environment';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord("user", params.user_id);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("avatarEndpoint", "/users/" + model.id);
  },
  actions: {
    refreshModel() {
      Ember.$("#image-dropzone").hide(500);
      this.refresh();
    }
  }
});
