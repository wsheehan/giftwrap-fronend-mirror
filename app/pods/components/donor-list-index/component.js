import Ember from 'ember';

export default Ember.Component.extend({

	session: Ember.inject.service(),

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
					const d = document.getElementById("donor-list-id-" + response.search.id);
					document.getElementById('donor-list-table').scrollTop = d.offsetTop - 220;
				}
			});
		},
		chooseDonorList(donorList) {
			this.sendAction("chooseDonorList", donorList);
		}
	}
});
