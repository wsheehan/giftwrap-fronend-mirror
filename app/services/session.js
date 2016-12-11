import Ember from 'ember';
import ESASession from "ember-simple-auth/services/session";

export default ESASession.extend({

	store: Ember.inject.service(),

	sessionToken: Ember.computed('isAuthenticated', 'session.content.authenticated.token', function() {
		if (this.get('isAuthenticated')) {
			return this.get('session.content.authenticated.token');
		}
	}),

	currentUser: Ember.computed('isAuthenticated', 'session.content.authenticated.user', function() {
		if (this.get('isAuthenticated')) {
			const user = this.get('session.content.authenticated.user');
			if (!this.get('store').recordIsLoaded('user', user.user_id)) {
				this.get('store').push({
					data: {
						id: user.user_id,
						type: 'user',
						attributes: {
							firstName: user.first_name,
							lastName: user.last_name,
							email: user.email
						}
					}
				});
			}
			return this.get('store').peekRecord('user', user.user_id);
		}
	})

});
