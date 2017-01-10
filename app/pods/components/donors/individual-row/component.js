import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['donor-table-row'],
	routing: Ember.inject.service('-routing'),

	actions: {
		chooseDonor() {
			if (this.get('linkToProfile')) {
				this.get('routing').transitionTo('donors.show', [this.get('donor.id')]);
			} else {
				this.sendAction("chooseDonor", this.get('donor'));
			}
		},
		removeDonor() {
			this.sendAction("removeDonor", this.get('donor'));
		}
	}
});
