import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model(params) {
		return this.get('store').query('donor',{
			page: {
				number: params.page,
				size: params.size
			}
		});
	},
	setupController(controller, model) {
		controller.set("donors", model);
		controller.set("selectedDonors", []);
		controller.set("donorSearchResults", []);
		controller.set("newDonorList", {});
	},
	actions: {
		nextDonors(offset) {
			this.incrementProperty("controller.page", offset);
			const donors = this.get('store').query('donor',{
				page: {
					number: this.get("controller.page"),
					size: this.get("controller.size")
				}
			});
			this.set("controller.donors", donors);
		},
		createDonorList(donors, newDonorList) {
			let donorList = this.get('store').createRecord('donor-list', Object.assign(newDonorList, {
				donors: donors
			}));
			donorList.save().then((donorList) => {
				console.log("Success");
			}, (error) => {
				console.log(error);
			})
		}
	}
});
