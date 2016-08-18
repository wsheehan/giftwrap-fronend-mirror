import Ember from 'ember';
import Braintree from 'npm:braintree-web';

export default Ember.Component.extend({
	didInsertElement() {
		let token = document.getElementById('braintreeToken').value;
		Braintree.client.create({
			authorization: token
		}, function(clientErr, clientInstance) {
			if (clientErr) {
				alert("Error Creating Client: " + clientErr);
				return;
			}
			Braintree.paypal.create({
				client: clientInstance
			}, function(paypalErr, paypalInstance) {
				if (paypalErr) {
					alert("Error With Paypal: " + paypalErr);
					return;
				}
				document.getElementById('paypal-button').addEventListener('click', function () {

					paypalInstance.tokenize({
						flow: 'vault'
					}, function (tokenizeErr, payload) {

					if (tokenizeErr) {
						if (tokenizeErr.type !== 'CUSTOMER') {
							alert('Error tokenizing: ' + tokenizeErr);
						}
						return;
					}

					console.log('Got a nonce! You should submit this to your server.');
					console.log(payload.details.email)

					});
				});
			});
		});
	}
});
