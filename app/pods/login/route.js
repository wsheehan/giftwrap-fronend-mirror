import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	session: Ember.inject.service('session'),

	setupController(controller) {
		controller.set('credentials', {});
	},

	actions: {
		authenticate(credentials) {
		  this.get('session').authenticate('authenticator:jwt', credentials).then(() => {
		  	this.transitionTo('/');
		  }, () => {
		  	$("#login-error").html('Invalid Email/Password Combination');
		  });
		}
	}
});
