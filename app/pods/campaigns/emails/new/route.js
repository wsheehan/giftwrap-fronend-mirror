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
		// searchDonorLists(e) {
		// 	// Send search query
		// 	const token = this.get('session.sessionToken');
		// 	Ember.$.ajax({
		// 		url: "/api/v1/donor_lists/search",
		// 		type: "POST",
		// 		beforeSend: function(xhr) {
		// 			xhr.setRequestHeader('Authorization', "Bearer " + token); // Auth
		// 		},
		// 		data: { "search": { "q": e } }
		// 	}).then(function(response) {
		// 		if (response.search) {
		// 			// Scroll the index to the Donor List given by search result
		// 			const d = document.getElementById("donor-list-id-" + response.search.id);
		// 			document.getElementById('donor-list-table').scrollTop = d.offsetTop - 220;
		// 		}
		// 	});
		// },
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
