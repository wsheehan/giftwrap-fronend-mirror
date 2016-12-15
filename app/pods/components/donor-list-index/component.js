import Ember from 'ember';

export default Ember.Component.extend({

	session: Ember.inject.service(),

	actions: {
		searchDonorLists(e) {
			this.sendAction("searchDonorLists", e);
		},
		chooseDonorList(donorList) {
			this.sendAction("chooseDonorList", donorList);
		},
		removeDonorList(donorList) {
			this.sendAction("removeDonorList", donorList);
		},
		nextDonorLists(page, offset) {
			this.sendAction("nextDonorLists", page, offset);
		},
		sizeChange(e) {
			this.sendAction("sizeChange", e);
		}
	}
});
