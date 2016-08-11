import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),

	actions: {
		authenticate: function() {
		  var credentials = this.getProperties('identification', 'password'),
		    authenticator = 'authenticator:jwt';

		  this.get('session').authenticate(authenticator, credentials).then(() => {
		  	this.transitionToRoute('/campaigns/texts/new'); // Will change to home page or user profile...
		  }, () => {
		  	$("#login-error").html('Invalid Email/Password Combination');
		  });
		}
	}
});
