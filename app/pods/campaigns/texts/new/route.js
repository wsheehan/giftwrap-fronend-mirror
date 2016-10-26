import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Moment from 'npm:moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		return this.get('store').findAll('donor-list');
	},
	setupController(controller) {
		controller.set("newText", {});
		controller.set("currentTime", {"day": Moment().format('dddd, MMMM D'),"time": Moment().format("h:mm")});
	},
	actions: {
		sendTexts(newText) {
			console.log(newText)
		}
	}
});
