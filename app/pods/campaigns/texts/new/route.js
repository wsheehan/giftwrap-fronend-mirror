import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Moment from 'npm:moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	model() {
		return this.get('store').findAll('donor-list');
	},
	setupController(controller, model) {
		controller.set("newText", {});
		controller.set("currentTime", {"day": Moment().format('dddd, MMMM D'),"time": Moment().format("h:mm")});
		controller.set("donorLists", model);
		controller.set("searchQuery", "");
		controller.set("chosenDonorList", {});
	},
	actions: {
		searchDonorLists(e) {
			// Send search query
			const token = this.get('session.sessionToken');
			Ember.$.ajax({
				url: "/api/v1/donor_lists/search",
				type: "POST",
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', "Bearer " + token); // Auth
				},
				data: { "search": { "q": e } }
			}).then(function(response) {
				if (response.search) {
					// Scroll the index to the Donor List given by search result
					const d = document.getElementById("donor-list-id-" + response.search.id)
					document.getElementById('donor-list-table').scrollTop = d.offsetTop - 220;
				}
			});
		},
		sendTexts(newText) {
			console.log(newText)
		}
	}
});
