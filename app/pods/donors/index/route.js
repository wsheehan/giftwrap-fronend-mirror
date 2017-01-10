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
		this._super(controller, model);
	}
});
