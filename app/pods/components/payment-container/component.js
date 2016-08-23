import Ember from 'ember';
import Braintree from 'npm:braintree-web';

export default Ember.Component.extend({
	didInsertElement() {
		let token = document.getElementById('braintreeToken').value;
		Braintree.client.create({
			authorization: token
		}, function(clientErr, clientInstance) {
			if (clientErr) {
				console.log(clientErr);
				return;
			}

			// Instantiate Paypal
			Braintree.paypal.create({
				client: clientInstance
			}, function(paypalErr, paypalInstance) {
				if (paypalErr) {
					console.log("Paypal Error: " + paypalErr);
					return;
				}
				document.getElementById('paypal-button').addEventListener('click', function () {
					paypalInstance.tokenize({
						flow: 'vault'
					}, function (tokenizeErr, payload) {

					if (tokenizeErr) {
						if (tokenizeErr.type !== 'CUSTOMER') {
							console.log(tokenizeErr);
						}
						return;
					}
					console.log(payload);
					document.getElementById('paymentMethodNonce').value = payload.nonce;

					});
				});
			});

			// Instantiate Hosted Fields
			// Braintree.hostedFields.create({
			// 	client: clientInstance,
			// 	styles: { 
			// 		'input.invalid': {
			// 			"color": "red"
			// 		},
			// 		'input.valid': {
			// 			"color": "green"
			// 		}
			// 	},
			// 	fields: {
			// 		number: {
			// 			selector: "#card-number",
			// 			placeholder: "4111 1111 1111 1111"
			// 		},
			// 		expirationDate: {
			// 			selector: "#exp-date",
			// 			placeholder: "10 / 2019"
			// 		}
			// 	}
			// }, function (hostedFieldsErr, hostedFieldsInstance) {
			// 	if (hostedFieldsErr) {
			// 		alert("Error with Hosted Fields: " + hostedFieldsErr);
			// 		return;
			// 	}

			// 	hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
			// 		if (tokenizeErr) {
			// 			alert("(Hosted) Could not tokenize: " + tokenizeErr);
			// 			return;
			// 		}
			// 		console.log(payload)
			// 	})
			// });

		});
	}
});
