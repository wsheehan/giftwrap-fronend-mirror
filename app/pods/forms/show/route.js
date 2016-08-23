import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
	model(params) {
		return RSVP.hash({
			form: this.get('store').findRecord('form', params.client_id),
		 	client: this.get('store').findRecord('client', params.client_id)
		});
	},
	setupController(controller, params) {
		controller.set("newGift", {});
		controller.set("newDonor", { "client_id": params.client.id });
	},
	actions: {
		submitForm(newGift, newDonor) {
			let nonce = document.getElementById('paymentMethodNonce').value;
			let donor = this.get('store').createRecord('donor', newDonor);
			donor.save().then((returnedDonor) => {
				let gift = this.get('store').createRecord('gift', { newGift, donor: donor, paymentMethodNonce: nonce });
				gift.save().then((returnedGift) => {
					alert("Gift Saved");
				}, (error) => {
					alert(error);
				});
			}, (error) => {
				console.log(error);
			})
		}
	}
});
