import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['image-field'],

  actions: {
    readImage(previewID) {
      let preview = document.getElementById(previewID);
      let file = document.getElementById('image').files[0];
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        preview.src = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }
});
