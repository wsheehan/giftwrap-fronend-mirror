import Ember from 'ember';

export default Ember.Route.extend({
  renderer: {},

  setupController(controller) {
    controller.set("newDonor", {});
    controller.set("failureObject", {"message":"The donor could not be saved", "error":"first_name cannot be blank"});
    // controller.set("failureModal", false);
  },

  actions: {
    saveDonor(newDonor) {
      let donor = this.get('store').createRecord("donor", newDonor);
      donor.save().then((donor) => {
        this.set("controller.successObject", {"message":"Donor Successfully Created!", "donor": donor});
      }, (error) => {
        this.set("controller.failureObject", {"message":"The donor could not be saved", "error": error.errors.msg.join(" ")});
      })
    }
  }
});
