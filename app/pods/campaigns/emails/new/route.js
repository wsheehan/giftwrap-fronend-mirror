import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),

	model() {
		return this.get('store').findAll('donor-list');
	},
	setupController(controller, model) {
		controller.set("newEmail", {});
		controller.set("donorLists", model);
		//controller.set("searchQuery", "");
		controller.set("chosenDonorList", {});
	},
	actions: {
		sendEmails(newEmail, chosenDonorList) {
			const donorList = this.get('store').peekRecord('donor-list', chosenDonorList.id);
			let email = this.get('store').createRecord("campaigns/email", Object.assign(newEmail, {
				donorList: donorList,
				user: this.get('session.currentUser')
			}));
			email.save().then((email) => {
				this.transitionTo('/campaigns/' + email.get('campaign').content.id);
			}, (error) => {
				alert(error.errors.msg);
			});
		}
	}
});
