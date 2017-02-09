import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showDropzonePopup() {
      Ember.$("#image-dropzone").show(500);
    }
  }
});
