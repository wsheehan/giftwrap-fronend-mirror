import Ember from 'ember';

export default Ember.Route.extend({
	setupController(controller) {
		controller.set('newCampaign', {});
	},
	actions: {
		createCampaign(newCampaign) {
			let camp = this.get('store').createRecord('campaign', newCampaign);
			camp.save().then((campaign) => {
				this.transitionTo('/campaigns/' + campaign.id);
			}, (error) => {
				console.log(error);
			});
		}
	}
});
