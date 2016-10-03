import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
	model(params) {
		if (params.k) {
			return RSVP.hash({
				form: this.get('store').findRecord('form', params.client_id),
			 	client: this.get('store').findRecord('client', params.client_id),
				donor: this.get('store').queryRecord('forms/donor', {"k": params.k, "c": params.client_id })
			});
		} else {
			return RSVP.hash({
				form: this.get('store').findRecord('form', params.client_id),
			 	client: this.get('store').findRecord('client', params.client_id)
			})
		}
	},
	setupController(controller, models) {
		controller.set("form", models.form);
		controller.set("client", models.client)
		controller.set("newGift", {});
		if (models.donor) {
			controller.set("donor", models.donor)
			controller.set('updateDonor', {})
		} else {
			controller.set("newDonor", { "client_id": models.client.id });
		}
		controller.set("hideHeader", true);
	},
	actions: {
		submitForm(newGift, newDonor, donorId, updateDonor) {
			let nonce = document.getElementById('paymentMethodNonce').value;
			let validity = 0;
			if (newDonor.firstName && newDonor.lastName && newDonor.email && newDonor.phoneNumber) {
				validity += 1;
			}
			if (newGift.total) {
				validity += 1;
			} else {

			}
			if (nonce) {
				validity += 1;
			}
			console.log(validity);
			if (validity !== 3) {
				return;	
			}
			// if (newDonor) {
			// 	let currentDonor = this.get('store').createRecord('donor', newDonor);
			// 	currentDonor.save().then((returnedDonor) => {
			// 		let gift = this.get('store').createRecord('gift', Object.assign(newGift, { donor: currentDonor, paymentMethodNonce: nonce }));
			// 		gift.save().then((returnedGift) => {
			// 			alert("Gift Saved");
			// 		}, (error) => {
			// 			alert(error);
			// 			console.log(error)
			// 		});
			// 	}, (error) => {
			// 		console.log(error);
			// 	});
			// } else if (donorId) {
			// 	let currentDonor = this.get('store').peekRecord('forms/donor', donorId);
			// 	if (currentDonor) {
			// 		let gift = this.get('store').createRecord('gift', Object.assign(newGift, { formDonor: currentDonor, paymentMethodNonce: nonce }));
			// 		gift.save().then((returnedGift) => {
			// 			alert("Gift Saved");
			// 		}, (error) => {
			// 			alert(error);
			// 			console.log(error)
			// 		});
			// 	}
			// }
		}
	}
});
