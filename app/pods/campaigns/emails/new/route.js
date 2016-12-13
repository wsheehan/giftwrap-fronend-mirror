import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),

	model(params) {
		return this.get('store').query('donor-list',{
			page: {
				number: params.page,
				size: params.size
			}
		});
	},
	setupController(controller, model) {
		controller.set("newEmail", {});
		controller.set("donorLists", model);
		controller.set("chosenDonorList", {});
		controller.set("currentUser", this.get('session.currentUser'));
		controller.set("donorListSearchResults", []);
	},
	actions: {
		sendEmails(newEmail, chosenDonorList) {
			let valid = true;

			invalid(newEmail.body, "#email-create > #email-body", "Please Enter an Email Body");
			invalid(newEmail.subject, "#email-create > #email-subject", "Please Enter a Subject Line");
			invalid(chosenDonorList.id, "#no-chosen-donor-list", "Please Select a Donor List");

			function invalid(val, el, msg) {
				if (!val) {
					Ember.$(el).addClass("input-error");
					Ember.$(el + "-error").html(msg);
					valid = false;
				} else {
					Ember.$(el).removeClass("input-error");
					Ember.$(el + "-error").html('');
				}
			}

			if (valid) {
				const donorList = this.get('store').peekRecord('donor-list', chosenDonorList.id);
				let email = this.get('store').createRecord("campaigns/email", Object.assign(newEmail, {
					donorList: donorList,
					user: this.get('session.currentUser')
				}));
				email.save().then((email) => {
					this.transitionTo('/campaigns/' + email.get('campaign').content.id);
				}, (error) => {
					alert(error.errors.msg);
				});
			}
		}
	}
});
