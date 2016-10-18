import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
	model(params) {
		if (params.k) {
			return RSVP.hash({
				form: this.get('store').findRecord('form', params.client_id),
			 	client: this.get('store').findRecord('client', params.client_id),
				donor: this.get('store').queryRecord('forms/donor', {"k": params.k, "c": params.client_id }),
				conversion: this.get('store').createRecord('metrics/forms/conversion', { "key": params.k, "client_id": params.client_id, "campaign_id": params.ca }).save()
			});
		} else {
			return RSVP.hash({
				form: this.get('store').findRecord('form', params.client_id),
			 	client: this.get('store').findRecord('client', params.client_id),
			 	conversion: this.get('store').createRecord('metrics/forms/conversion', { "client_id": params.client_id }).save()
			});
		}
	},
	setupController(controller, models) {
		controller.set("form", models.form);
		controller.set("client", models.client);
		controller.set("newGift", {});
		controller.set("conversion", models.conversion);
		if (models.donor) {
			controller.set("donor", models.donor);
			controller.set('updateDonor', {});
		} else {
			controller.set("newDonor", { "client_id": models.client.id });
		}
		controller.set("hideHeader", true);
	},
	actions: {
		submitForm(newGift, newDonor, donor, client, conversion) {
			let nonce = document.getElementById('paymentMethodNonce').value;
			let fields = [newDonor.firstName, newDonor.lastName, newDonor.email, newDonor.phoneNumber, newGift.total, nonce];
			let valid = true; let i;
			for (i = 0; i < fields.length; i++) {
				if (i === 4) {
					if (fields[i] === undefined) {
						document.getElementById('totals-error').innerText = "Please Specify a Total";
						document.getElementById('totals-error').style.display = "block";
						valid = false;
					} else { 
						document.getElementById('totals-error').style.display = "none"; 
					}
				}
				if (i === 5) {
					if (nonce) {
						Ember.$("#payment-errors").css("display", "none");
					} else {
						let e = Ember.$("#payment-errors");
						e.text("Invalid or Empty Payment Information");
						e.addClass("payment-submit-error");
						valid = false;
					}
				}
				if (i === 0) {
					if (fields[i] === undefined || fields[i] === "") {
						Ember.$("#donor-first-name").addClass("input-error");
						Ember.$("#donor-first-name-error").text("First Name Cannot be blank");
						valid = false;
					} else {
						Ember.$("#donor-first-name").removeClass("input-error");
						Ember.$("#donor-first-name-error").text("");
					}			
				} 
				if (i === 1) {
					if (fields[i] === undefined || fields[i] === "") {
						Ember.$("#donor-last-name").addClass("input-error");
						Ember.$("#donor-last-name-error").text("Last Name Cannot be blank");
						valid = false;
					} else {
						Ember.$("#donor-last-name").removeClass("input-error");
						Ember.$("#donor-last-name-error").text("");
					}			
				}
				if (i === 2) {
					if (/\S+@\S+\.\S+/.test(fields[i])) {
						Ember.$("#donor-email").removeClass('input-error');
						document.getElementById("donor-email-error").innerText = "";
					} else {
						Ember.$("#donor-email").addClass('input-error');
						document.getElementById("donor-email-error").innerText = 'Please enter a valid email address';
					}
				}
				if (i === 3) {
					if (fields[i] === undefined || fields[i] === "") {
						Ember.$("#donor-phone-number").addClass("input-error");
						Ember.$("#donor-phone-number-error").text("Phone Number Cannot be blank");
						valid = false;
					} else {
						Ember.$("#donor-phone-number").removeClass("input-error");
						Ember.$("#donor-phone-number-error").text("");
					}
				}
			}
			if (valid) {
				let currentDonor = donor ? donor : newDonor;
				let gift = this.get('store').createRecord("forms/gift", Object.assign(newGift, currentDonor, { paymentMethodNonce: nonce, client: client, formConversion: conversion }));
				gift.save().then((returnedGift) => {
					alert("Gift Saved");
				}, (error) => {
					alert(error.errors.msg)
				});
			}
		}
	}
});
