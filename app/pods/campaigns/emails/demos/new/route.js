import Ember from 'ember';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	setupController(controller) {
		controller.set('newEmail', {});
	},
	actions: {
		sendDemoEmail(newEmail) {
			let email = this.get('store').createRecord('campaigns/emails/demo', newEmail);
			email.save().then(() => {
				alert('Email Sent Successfully');
			}, (err) => {
				alert('Could Not Send Email: ' + err);
			});
		}	
	}
});
