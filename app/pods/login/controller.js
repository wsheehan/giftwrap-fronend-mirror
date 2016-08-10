import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),

	actions: {
		authenticate: function() {
		  var credentials = this.getProperties('identification', 'password'),
		    authenticator = 'authenticator:jwt';

		  this.get('session').authenticate(authenticator, credentials).then(() => {
		  	this.transitionToRoute('/donors/1'); // Will change to home page or user profile...
		  }, () => {
		  	$("#login-error").html('<p>Invalid Email/Password Combination</p>');
		  });
		}
	}
});
