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
});
