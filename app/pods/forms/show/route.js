import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
	model(params) {
		return RSVP.hash({
			form: this.get('store').findRecord('form', params.client_id),
			client: this.get('store').findRecord('client', params.client_id),
			gift: this.get('store').createRecord('gift'),
			donor: this.get('store').createRecord('donor')
		});
	}
});
