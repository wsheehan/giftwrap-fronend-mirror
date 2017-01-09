import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.get('store').findRecord('form', params.client_id, { adapterOptions: { query: {"k": params.k, "ca": params.ca}}})
	},
	setupController(controller, model) {
		this._super(controller, model);
		controller.set("newGift", {});
		controller.set("newDonor", {});
	},
	actions: {
		submitForm(newGift, newDonor, model, isPaymentMethod) {
			let newModel = model.serialize();

			let valid = true; let nonce;
			if (newModel.donor) {
				checkTotal(newGift.total);
				if (!isPaymentMethod) {
					nonce = document.getElementById('paymentMethodNonce').value;
					checkNonce(nonce);
				}
			} else {
				nonce = document.getElementById('paymentMethodNonce').value;
				// Validate Fields
				checkTotal(newGift.total);
				checkNonce(nonce);
				checkBlank(newDonor.firstName, "first-name");
				checkBlank(newDonor.lastName, "last-name");
				checkBlank(newDonor.phoneNumber, "phone-number");
				checkEmail(newDonor.email);

				function checkBlank(field, fieldName) {
					if (field === undefined || field === "") {
						Ember.$("#donor-" + fieldName).addClass("input-error");
						Ember.$("#donor-" + fieldName + "-error").text("Cannot be blank");
						valid = false;
					} else {
						Ember.$("#donor-" + fieldName).removeClass("input-error");
						Ember.$("#donor-" + fieldName + "-error").text("");
					}
				}
				function checkEmail(email) {
					if (/\S+@\S+\.\S+/.test(email)) {
						Ember.$("#donor-email").removeClass('input-error');
						document.getElementById("donor-email-error").innerText = "";
					} else {
						Ember.$("#donor-email").addClass('input-error');
						document.getElementById("donor-email-error").innerText = 'Please enter a valid email address';
					}
				}
			}
			function checkTotal(total) {
				if (total === undefined) {
					document.getElementById('totals-error').innerText = "Please Specify a Total";
					document.getElementById('totals-error').style.display = "block";
					valid = false;
				} else {
					document.getElementById('totals-error').style.display = "none";
				}
			}
			function checkNonce(nonce) {
				if (nonce) {
					Ember.$("#payment-errors").css("display", "none");
				} else {
					let e = Ember.$("#payment-errors");
					e.text("Invalid or Empty Payment Information");
					e.addClass("payment-submit-error");
					valid = false;
				}
			}
			if (valid) {
				if (!newModel.donor) {
					newModel.donor = newDonor;
				}
				console.log(newModel);
				let gift = this.get('store').createRecord("forms/gift", Object.assign(newGift, currentDonor, { paymentMethodNonce: nonce, client: client, formConversion: conversion, newPaymentMethod: !isPaymentMethod }));
				gift.save().then((returnedGift) => {
					alert("Gift Saved");
				}, (error) => {
					alert(error.errors.msg)
				});
			}
		}
	}
});
