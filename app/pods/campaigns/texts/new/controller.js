import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),

	actions: {
		// Set the chosen Donor list
		chooseDonorList(donorList) {
			this.set('chosenDonorList', donorList);
		}
	}
});
