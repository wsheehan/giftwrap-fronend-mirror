import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		chooseDonorList(donorList) {
			this.set('chosenDonorList', donorList);
		}
	}
});
