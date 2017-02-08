import Ember from 'ember';
import Dropzone from 'npm:dropzone';
import ENV from 'giftwrap/config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  didRender() {
    var dropzone = new Dropzone("#image-dropzone", {
      url: ENV.APP.API_URL + "/" + ENV.API_NAMESPACE + this.get('endpoint'),
      headers: { "Authorization": "Bearer " + this.get('session.sessionToken') },
      paramName: "users[avatar]",
      method: "PUT"
    });
    if (this.get('closeAfter')) {
      dropzone.on("complete", (file) => {
        console.log(this.get('completeAction'));
        this.get('refreshModel')(this.get('completeAction'));
      });
    }
  }
});
