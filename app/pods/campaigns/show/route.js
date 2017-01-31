import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model(params) {
		return this.get('store').findRecord('campaign', params.campaign_id);
	},
	setupController(controller, model) {
		this._super(controller, model);
	}
});
