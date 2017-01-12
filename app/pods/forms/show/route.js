import Ember from 'ember';

export default Ember.Route.extend({
	formValidator: Ember.inject.service(),

	model(params) {
		return this.get('store').findRecord('form', params.client_id, { adapterOptions: { query: {"k": params.k, "ca": params.ca}}})
	},
	setupController(controller, model) {
		this._super(controller, model);
		controller.set("newGift", {});
		controller.set("newDonor", {});
	},
	actions: {
		submitForm(newGift, newDonor, model) {
			let newModel = model.serialize();
			let nonce = document.getElementById('paymentMethodNonce').value;
			let validate = this.get('formValidator'); let valids = []; let valid = true;

			if (newModel.donor) {
				valids.push(validate.giftTotal(newGift.total, "#totals-error"));
				valids.push(validate.isNonce(nonce, "#payment-errors"));
				valid = validate.valid(valids);
			} else {
				valids.push(validate.blank(newDonor.firstName, "#donor-first-name", "#donor-first-name-error"));
				valids.push(validate.blank(newDonor.lastName, "#donor-last-name", "#donor-last-name-error"));
				valids.push(validate.blank(newDonor.phoneNumber, "#donor-phone-number", "#donor-phone-number-error"));
				valids.push(validate.email(newDonor.email, "#donor-email", "#donor-email-error"));
				valids.push(validate.giftTotal(newGift.total, "#totals-error"));
				valids.push(validate.isNonce(nonce, "#payment-errors"));
				valid = validate.valid(valids);
			}
			if (valid) {
				let donor_id;
				console.log(newModel);
				if (newModel.donor) { let donor_id = newModel.donor.id; }
				let gift = this.get('store').createRecord("forms/gift",
					Object.assign(newGift, newDonor, { paymentMethodNonce: nonce, client_id: newModel.client.id, donor_id: donor_id })
				);
				gift.save().then((returnedGift) => {
					alert("Gift Saved");
				}, (error) => {
					alert(error.errors.msg)
				});
			}
		}
	}
});
