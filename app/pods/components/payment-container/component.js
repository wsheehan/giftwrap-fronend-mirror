import Ember from 'ember';
import Braintree from 'npm:braintree-web';

export default Ember.Component.extend({
	didRender() {
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
					$("#payment-container").slideUp(400);
					document.getElementById('paypal-info').style.display = 'block';
					document.getElementById('paypal-email').innerHTML = '' + payload.details.email + '';
					});
				});
				document.getElementById('paypal-cancel').addEventListener('click', function() {
					paypalInstance.teardown(function (teardownErr) {
						if (teardownErr) {
							alert("Could Not Teardown Method");
						} else {
							$("#payment-details").hide(100);
							$("#payment-container").slideDown(400);
						}
					});
				});
			});

			// Instantiate Hosted Fields
			Braintree.hostedFields.create({
				client: clientInstance,
				styles: { 
					'input': {
						"font-size": '16px',
						"color": '#282c37'
					},
					'input.invalid': {
						"color": "#E53A40"
					},
					'input.valid': {
						"color": "green",
						"border": "green"
					}
				},
				fields: {
					number: {
						selector: "#card-number",
						placeholder: "1111 1111 1111 1111"
					},
					expirationDate: {
						selector: "#exp-date",
						placeholder: "10 / 2019"
					},
					cvv: {
						selector: "#cvv",
						placeholder: "123"
					}
				}
			}, function (hostedFieldsErr, hostedFieldsInstance) {
				if (hostedFieldsErr) {
					console.log(hostedFieldsErr);
					return;
				}
				
				Ember.$("#payment-container").slideDown(500); // Show container once both methods have been instantiated

				hostedFieldsInstance.on('validityChange', function (event) {
			      // Check if all fields are valid, then show submit button
			      let formValid = Object.keys(event.fields).every(function (key) {
			        return event.fields[key].isValid;
			      });

			      if (formValid) {
			        console.log("Every Field Valid");
			        hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
						if (tokenizeErr) {
							alert("(Hosted) Could not tokenize: " + tokenizeErr);
							return;
						}
						document.getElementById('paymentMethodNonce').value = payload.nonce;
						document.getElementById('card-info').style.display = 'block';
						//document.getElementById('paypal-email').innerHTML = '' + payload.details.email + '';
					});
			      } else {
			        console.log("Some Fields Still invalid");
			      }
			    });

			    document.getElementById('card-cancel').addEventListener('click', function() {
			    	hostedFieldsInstance.teardown(function (teardownErr) {
			    		if (teardownErr) {
							alert("Could Not Teardown Method");
						} else {
							$("#payment-details").hide(100);
							$("#payment-container").slideDown(400);
						}
			    	});
			    });
			});
		});
	}
});
