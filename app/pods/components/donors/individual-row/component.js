import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['donor-table-row'],

	actions: {
		chooseDonor(donor) {
			this.sendAction("chooseDonor", donor)
		},
		removeDonor(donor) {
			this.sendAction("removeDonor", donor)
		}
	}
});
